import { mnemonicToSeed } from 'bip39'
import sodiumsumo from 'libsodium-wrappers-sumo'
import bs58check from 'bs58check'
import { validateMnemonic } from '../mnemonic/mnemonic'

const isValidMnemonic = (mnemonic: string): boolean | Error => {
  if (!validateMnemonic(mnemonic)) {
    throw new Error('invalid mnemonic string')
  }
  return true
}

const getSeed = async (mnemonic: string, passPhrase: string): Promise<Buffer> =>
  (await mnemonicToSeed(mnemonic, passPhrase)).slice(0, 32)

const getKeyStore = async (seed: Buffer): Promise<RawKeyStore> => {
  await sodiumsumo.ready
  return sodiumsumo.crypto_sign_seed_keypair(seed)
}

const b58encode = (prefix: Uint8Array, payload: Uint8Array): string => {
  const bytes = new Uint8Array(prefix.length + payload.length)
  bytes.set(prefix)
  bytes.set(payload, prefix.length)
  return bs58check.encode(Buffer.from(bytes as any, 'hex'))
}

const b58decode = (prefixArg: Uint8Array, message: string): Uint8Array =>
  bs58check.decode(message).slice(prefixArg.length)

const prefix = {
  tz1: new Uint8Array([6, 161, 159]),
  edpk: new Uint8Array([13, 15, 37, 217]),
  edsk: new Uint8Array([43, 246, 78, 7]),
  edsig: new Uint8Array([9, 245, 205, 134, 18]),
  sig: new Uint8Array([4, 130, 43])
}

export const generateKeysFromMnemonicAndPassphrase = async ({
  mnemonic,
  passphrase
}: MnemonicPassword): Promise<KeyStore> => {
  isValidMnemonic(mnemonic)
  const { publicKey, privateKey, keyType } = await getKeyStore(
    await getSeed(mnemonic, passphrase)
  )

  return {
    publicKey: b58encode(prefix.edpk, publicKey),
    privateKey: b58encode(prefix.edsk, privateKey),
    pkh: b58encode(prefix.tz1, sodiumsumo.crypto_generichash(20, publicKey)),
    keyType,
    mnemonic
  }
}

export const extractKeysFromPrivateKey = () => {}

export const bufferToHex = (buffer: Buffer): string =>
  Array.prototype.map
    .call(buffer, (byte: any) => byte.toString(16).padStart(2, '0'))
    .join('')

export const sign = ({ message, privateKey }: SignObject): string =>
  b58encode(
    prefix.sig,
    sodiumsumo.crypto_sign_detached(
      Buffer.from(message, 'utf8'),
      b58decode(prefix.edsk, privateKey),
      'uint8array'
    )
  )

export const verify = ({
  signature,
  message,
  publicKey
}: VerifyObject): boolean =>
  sodiumsumo.crypto_sign_verify_detached(
    b58decode(prefix.sig, signature),
    message,
    b58decode(prefix.edpk, publicKey)
  )

// stolen from https://github.com/TezTech/eztz/blob/master/src/main.js until I can understand what it is doing :-p
export const zarith = (num: string): string => {
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

const sliceDecode = (slice: number) => (hash: string): string =>
  bs58check
    .decode(hash)
    .slice(slice)
    .toString('hex')

export const forgeAddress = (address: string): string =>
  `0000${sliceDecode(3)(address)}`

export const forgeBranch = sliceDecode(2)

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
