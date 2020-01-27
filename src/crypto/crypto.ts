import { mnemonicToSeed } from 'bip39'
import sodiumsumo from 'libsodium-wrappers-sumo'
import { validateMnemonic } from '../mnemonic/mnemonic'

const isValidMnemonic = (mnemonic: string): boolean | Error => {
  if (!validateMnemonic(mnemonic)) {
    throw new Error('invalid mnemonic string')
  }
  return true
}

export const getKeysFromMnemonicAndPassphrase = async (
  mnemonic: string,
  passPhrase: string
): Promise => {
  await sodiumsumo.ready
  isValidMnemonic(mnemonic)
  const seed = (await mnemonicToSeed(mnemonic, passPhrase)).slice(0, 32)
  const {
    publicKey,
    privateKey,
    keyType
  } = sodiumsumo.crypto_sign_seed_keypair(seed, '')
  return {
    publicKey,
    privateKey,
    keyType
  }
}
