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
    .call(new Uint8Array(buffer), (byte: any) =>
      byte.toString(16).padStart(2, '0')
    )
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
