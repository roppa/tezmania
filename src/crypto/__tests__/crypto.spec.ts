import { getKeysFromMnemonicAndPassphrase } from '../crypto'
import { generateMnemonic } from '../../mnemonic/mnemonic'

describe('Crypto library', () => {
  describe('getKeysFromMnemonicAndPassphrase', () => {
    test('should reject when no mnemonic', async () => {
      await getKeysFromMnemonicAndPassphrase().catch((error: Error) => {
        expect(error.message).toEqual('invalid mnemonic string')
      })
    })
    test('should reject when no passphrase', async () => {
      await getKeysFromMnemonicAndPassphrase(generateMnemonic()).catch(
        (error: Error) => {
          expect(error).toBeDefined()
        }
      )
    })
    test('should return object with publicKey, privateKey, publicKeyHash', async () => {
      const keystore = await getKeysFromMnemonicAndPassphrase(
        generateMnemonic(),
        'mypassword'
      )
      expect(keystore.publicKey).toBeDefined()
      expect(keystore.privateKey).toBeDefined()
      expect(keystore.keyType).toBeDefined()
    })
  })
})
