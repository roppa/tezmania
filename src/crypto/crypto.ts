import { mnemonicToSeed } from 'bip39'
import sodium from 'libsodium-wrappers-sumo'
import bs58check from 'bs58check'
import { validateMnemonic } from '../mnemonic/mnemonic'

const prefix = {
  tz1: new Uint8Array([6, 161, 159]),
  edpk: new Uint8Array([13, 15, 37, 217]),
  edsk: new Uint8Array([43, 246, 78, 7]),
  edsk2: new Uint8Array([13, 15, 58, 7]),
  edsig: new Uint8Array([9, 245, 205, 134, 18]),
  sig: new Uint8Array([4, 130, 43])
}

const mergeBuffer = (
  bufferA: Buffer | Uint8Array,
  bufferB: Buffer | Uint8Array
) => {
  const result = new Uint8Array(bufferA.length + bufferB.length)
  result.set(bufferA)
  result.set(bufferB, bufferA.length)
  return result
}

const b58encode = (prefix: Uint8Array, payload: Uint8Array): string => {
  const bytes = mergeBuffer(prefix, payload)
  return bs58check.encode(Buffer.from(bytes))
}

const b58decode = (prefixArg: Uint8Array, message: string): Uint8Array =>
  bs58check.decode(message).slice(prefixArg.length)

const isValidMnemonic = (mnemonic: string): boolean | Error => {
  if (!validateMnemonic(mnemonic)) {
    throw new Error('invalid mnemonic string')
  }
  return true
}

const getSeed = async (mnemonic: string, passPhrase: string): Promise<Buffer> =>
  (await mnemonicToSeed(mnemonic, passPhrase)).slice(0, 32)

const getKeyStore = async (seed: Buffer): Promise<RawKeyStore> => {
  await sodium.ready
  return sodium.crypto_sign_seed_keypair(seed)
}

export const generateKeysFromMnemonicAndPassphrase = async ({
  mnemonic,
  passphrase
}: MnemonicPassword): Promise<KeyStore> => {
  isValidMnemonic(mnemonic)
  const { publicKey, privateKey, keyType } = await getKeyStore(
    await getSeed(mnemonic, passphrase)
  )
  await sodium.ready
  return {
    publicKey: b58encode(prefix.edpk, publicKey),
    privateKey: b58encode(prefix.edsk, privateKey),
    pkh: b58encode(prefix.tz1, sodium.crypto_generichash(20, publicKey)),
    keyType,
    mnemonic
  }
}

export const bufferToHex = (buffer: Buffer | Uint8Array): string =>
  Array.prototype.map
    .call(buffer, (byte: any) => byte.toString(16).padStart(2, '0'))
    .join('')

export const hexToBuffer = (hex: string) =>
  new Uint8Array(hex.match(/.{2}/g)!.map(byte => parseInt(byte, 16)))

export const extractKeysFromSecret = (secret: string) => ({
  publicKey: b58encode(prefix.edpk, b58decode(prefix.edsk, secret).slice(32)),
  privateKey: secret,
  pkh: b58encode(
    prefix.tz1,
    sodium.crypto_generichash(20, b58decode(prefix.edsk, secret).slice(32))
  )
})

// stolen from https://github.com/TezTech/eztz/blob/master/src/main.js
export const sign = async ({ message, privateKey, watermark }: SignObject) => {
  const messageBuffer = watermark
    ? mergeBuffer(new Uint8Array([watermark]), hexToBuffer(message))
    : hexToBuffer(message)
  await sodium.ready
  const sig = sodium.crypto_sign_detached(
    sodium.crypto_generichash(32, messageBuffer),
    b58decode(prefix.edsk, privateKey),
    'uint8array'
  )

  return {
    bytes: message,
    sig,
    edsig: b58encode(prefix.edsig, sig),
    sbytes: message + bufferToHex(sig)
  }
}

export const verify = ({
  signature,
  message,
  publicKey
}: VerifyObject): boolean =>
  sodium.crypto_sign_verify_detached(
    signature,
    sodium.crypto_generichash(32, hexToBuffer(message)),
    b58decode(prefix.edpk, publicKey)
  )

// stolen from https://github.com/TezTech/eztz/blob/master/src/main.js until I can understand what it is doing :-p
const zarith = (num: string): string => {
  var fn = ''
  let n = parseInt(num)
  while (true) {
    if (n < 128) {
      if (n < 16) fn += '0'
      fn += n.toString(16)
      break
    } else {
      var b = n % 128
      n -= b
      n /= 128
      b += 128
      fn += b.toString(16)
    }
  }
  return fn
}

const sliceDecodeHash = (slice: number) => (hash: string): string =>
  bs58check
    .decode(hash)
    .slice(slice)
    .toString('hex')

export const forgeAddress = (address: string): string =>
  `0000${sliceDecodeHash(3)(address)}`

export const forgeBranch = sliceDecodeHash(2)

export const forgeOperation = ({
  source,
  fee,
  counter,
  gas_limit,
  storage_limit,
  amount,
  destination
}: Operation): string => {
  return `08${forgeAddress(source)}${zarith(fee)}${zarith(counter)}${zarith(
    gas_limit
  )}${zarith(storage_limit)}${zarith(amount)}${forgeAddress(destination)}00`
}

export const forge = (source: OperationMessage) =>
  source.contents.reduce(
    (curr, next) => curr + forgeOperation(next),
    forgeBranch(source.branch)
  )
