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

const b58cencode = (prefix: Uint8Array, payload: Uint8Array): string => {
  const n = new Uint8Array(prefix.length + payload.length)
  n.set(prefix)
  n.set(payload, prefix.length)
  // @ts-ignore
  return bs58check.encode(Buffer.from(n, 'hex'))
}

const prefix = {
  tz1: new Uint8Array([6, 161, 159]),
  edpk: new Uint8Array([13, 15, 37, 217]),
  edsk: new Uint8Array([43, 246, 78, 7])
}

export const generateKeysFromMnemonicAndPassphrase = async (
  mnemonic: string,
  passPhrase: string
): Promise<KeyStore> => {
  isValidMnemonic(mnemonic)
  const { publicKey, privateKey, keyType } = await getKeyStore(
    await getSeed(mnemonic, passPhrase)
  )

  return {
    publicKey: b58cencode(prefix.edpk, publicKey),
    privateKey: b58cencode(prefix.edsk, privateKey),
    pkh: b58cencode(prefix.tz1, sodiumsumo.crypto_generichash(20, publicKey)),
    keyType,
    mnemonic
  }
}

export const bufferToHex = (buffer: Buffer): string => {
  const bytes = new Uint8Array(buffer)
  return Array.prototype.map
    .call(bytes, byte => byte.toString(16).padStart(2, '0'))
    .join('')
}
