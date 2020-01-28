import { mnemonicToSeed } from 'bip39'
import sodiumsumo from 'libsodium-wrappers-sumo'
import bs58 from 'bs58'
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

const rawToHex = (raw: Buffer | Uint8Array) =>
  (raw instanceof Buffer ? raw : Buffer.from(raw)).toString('hex')

// stolen from https://github.com/Cryptonomic/ConseilJS/blob/a671d28e1f41cdfdf2c5f9212aba9343b27dcd83/src/chain/tezos/TezosMessageUtil.ts
export function readPublicKey(hex: string): string {
  if (hex.length !== 66 && hex.length !== 68) {
    throw new Error(`Incorrect hex length, ${hex.length} to parse a key`)
  }
  const hint = hex.substring(0, 2)
  let result = ''
  if (hint === '00') {
    result = `0d0f25d9` // ed25519
  } else if (hint === '01' && hex.length === 68) {
    result = `03fee256` // secp256k1
  } else if (hint === '02' && hex.length === 68) {
    result = `03b28b7f` // p256
  } else {
    throw new Error('Unrecognized key type')
  }
  return bs58.encode(Buffer.from(`${result}${hex.substring(2)}`, 'hex'))
}

export const publicKeyFromBuffer = (raw: Buffer | Uint8Array) =>
  readPublicKey(`00${rawToHex(raw)}`)

export const privateKeyFromBuffer = (raw: Buffer | Uint8Array) =>
  bs58.encode(Buffer.from(`2bf64e07${rawToHex(raw)}`, 'hex'))

export const getKeysFromMnemonicAndPassphrase = async (
  mnemonic: string,
  passPhrase: string
): Promise<KeyStore> => {
  isValidMnemonic(mnemonic)
  const { publicKey, privateKey, keyType } = await getKeyStore(
    await getSeed(mnemonic, passPhrase)
  )
  return {
    publicKey: publicKeyFromBuffer(publicKey),
    privateKey: privateKeyFromBuffer(privateKey),
    keyType
  }
}
