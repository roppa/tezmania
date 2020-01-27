import { validateMnemonic as validateBip39Mnemonic } from 'bip39'

export { generateMnemonic } from 'bip39'

export const validateMnemonic = (mnemonic: string = ''): boolean =>
  mnemonic.trim().split(/\s+/g).length >= 12 && validateBip39Mnemonic(mnemonic)
