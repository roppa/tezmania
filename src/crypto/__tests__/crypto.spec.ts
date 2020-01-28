import {
  getKeysFromMnemonicAndPassphrase,
  publicKeyFromBuffer,
  privateKeyFromBuffer,
  readPublicKey
} from '../crypto'
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
      expect(typeof keystore.privateKey).toEqual('string')
      expect(keystore.keyType).toBeDefined()
    })
  })
  describe('privateKeyFromBuffer', () => {
    test('should return hex string for edsk prefix', () => {
      expect(privateKeyFromBuffer(Buffer.from('secretkey'))).toEqual(
        '4fNx28ivDadKDcFvCg'
      )
    })
  })

  describe('publicKeyFromBuffer', () => {
    test('should return hex string for public key (edpk)', () => {
      expect(publicKeyFromBuffer(Buffer.from('a'.repeat(32)))).toEqual(
        '6kaamThzVujQAkSmKseGpdejtEdRJP2GuuxaWsymtwUbjvPZa'
      )
    })
  })

  describe('readPublicKey', () => {
    test('should throw when incorrect hex length', () => {
      expect(() => readPublicKey('')).toThrow(
        'Incorrect hex length, 0 to parse a key'
      )
    })
    test('should throw when incorrect hex hint', () => {
      expect(() =>
        readPublicKey(Buffer.from('a'.repeat(33)).toString('hex'))
      ).toThrow('Unrecognized key type')
    })
    test('should prefix 0d0f25d9 when ed25519 and hex length is 68', () => {
      const hex = '00' + 'a'.repeat(64)
      expect(readPublicKey(hex)).toEqual(
        '6kaamYe55MiPuvDSs4FXsUTYxUXkzCcdc5bhNfmRoCDsUTi7B'
      )
    })
    test('should prefix 03fee256 when secp256k1 and hex length is 68', () => {
      const hex = '01' + 'a'.repeat(66)
      expect(readPublicKey(hex)).toEqual(
        '8mVCjn239NYM2TXdnGHYGC6oQvcfR4TMzupz7Bamq1jo3xmdeh'
      )
    })
    test('should prefix 03b28b7f when p256 and hex length is 68', () => {
      const hex = '02' + 'a'.repeat(66)
      expect(readPublicKey(hex)).toEqual(
        '8BsDjQRRMARxnWArH8NEwHrfJpbfYdkCh6bUVbLeF1yRaX71Aq'
      )
    })
  })
})
