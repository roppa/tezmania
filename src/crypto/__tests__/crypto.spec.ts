import {
  generateKeysFromMnemonicAndPassphrase,
  extractKeysFromPrivateKey,
  bufferToHex,
  sign,
  verify
} from '../crypto'
import { generateMnemonic } from '../../mnemonic/mnemonic'

const stubKeystore = {
  mnemonic: 'utility orbit end win roast sail warrior toast cross banana news gossip swap theme piece'
  publicKey: 'edpkvFMQpH8CBZeXxyrYBFc3LH8zc3dC6qhzRzuiZXvGd8oxiQrXQo'
  privateKey: 'edskS3EdqCCLLsxNhLXoVVBtFzqJEXkNcJeNriPDSdn22yJgET8grjzcRrQ2bnJ9zYTdfZTUfSsMdC76FGNZE5wsLDuXfc4fJ8',
  pkh: 'tz1X7JKJ114Btq3Mbz62NJxJSrmWPo4guFVq'
  keyType: 'ed25519'
}

const messageSignature = 'sigg9YBuaGsJgZTzCM9mKv5hWLdte6qLfm8BuYih5VwBnN8MwLvJKDqMFJ1fhnWuz94GZot2YMJMuF8yE3gFjdckZqhTovvV'

describe('Crypto library', () => {
  describe('generateKeysFromMnemonicAndPassphrase', () => {
    test('should reject when no mnemonic', async () => {
      await generateKeysFromMnemonicAndPassphrase().catch((error: Error) => {
        expect(error.message).toEqual('invalid mnemonic string')
      })
    })
    test('should reject when no passphrase', async () => {
      await generateKeysFromMnemonicAndPassphrase(generateMnemonic()).catch(
        (error: Error) => {
          expect(error).toBeDefined()
        }
      )
    })
    test('should return object with keyStore values', async () => {
      const keystore = await generateKeysFromMnemonicAndPassphrase(
        stubKeystore.mnemonic,
        'password'
      )
      expect(keystore).toEqual(stubKeystore)
    })
  })

  describe('extractKeysFromPrivateKey', () => {
    test('should ..', () => {
      expect(extractKeysFromPrivateKey()).toEqual(undefined)
    })
  })

  describe('bufferToHex', () => {
    test('should convert buffer to hex string', () => {
      expect(bufferToHex(Buffer.from([1, 2]))).toEqual('0102')
    })
  test('should convert buffer to hex chars', () => {
      expect(bufferToHex(Buffer.from([15, 14, 13, 12]))).toEqual('0f0e0d0c')
    })

  test('should handle leading zeros', () => {
      expect(bufferToHex(Buffer.from([0, 14, 13, 12]))).toEqual('000e0d0c')
    })

  })

  describe('sign', () => {    
  test('should sign return object with required attributes', () => {
      expect(sign({ message: 'message', privateKey: stubKeystore.privateKey })).toEqual(messageSignature)
    })
  })

  describe('verify', () => {
    test('should return false for invalid signature', () => {
      expect(verify({ signature: messageSignature, message: 'wrongmessage', publicKey: stubKeystore.publicKey })).toEqual(false)
    })
    test('should return false for invalid signature', () => {
      expect(verify({ signature: messageSignature, message: 'message', publicKey: stubKeystore.publicKey })).toEqual(true)
    })
  })
})
