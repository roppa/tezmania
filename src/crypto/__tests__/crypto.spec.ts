import {
  generateKeysFromMnemonicAndPassphrase,
  extractKeysFromSecret,
  bufferToHex,
  hexToBuffer,
  sign,
  verify,
  forgeAddress,
  forgeBranch,
  forgeOperation,
  forge
} from '../crypto'

import { generateMnemonic } from '../../mnemonic/mnemonic'

import { roppa, transactionSource, roppaKeystore } from '../../__mocks__'

const hexMessage = Buffer.from('message', 'ascii').toString('hex')

const messageSignature =
  'edsigu1XwSv9d1F1vpiQSCc7wN93R9euRX6MnJxSB8ASFH4tBqihfnhuvfCRBgCyh8ynKk9BmeU5nCG5DFhemfGGG8LfmTwwG7d'

const forgedAddress = '000002298c03ed7d454a101eb7022bc95f7e5f41ac78'
const branch =
  'ce69c5713dac3537254e7be59759cf59c15abd530d10501ccf9028a5786314cf'
const forgedTransaction = `ce69c5713dac3537254e7be59759cf59c15abd530d10501ccf9028a5786314cf08000002298c03ed7d454a101eb7022bc95f7e5f41ac78d0860303c8010080c2d72f0000e7670f32038107a59a2b9cfefae36ea21f5aa63c00`
const transactionSignature =
  'edsigtgnsraGoXtPujHoNZxJzP1nqo1V4PfULFx5yAp1ujAMqdMAXgCdaCUSWF4DN4nzfM5sU2BQAgAFZM26KqU5G2bW95RzmFG'

describe('Crypto library', () => {
  describe('generateKeysFromMnemonicAndPassphrase', () => {
    test('should reject when no mnemonic', async () => {
      await generateKeysFromMnemonicAndPassphrase({
        mnemonic: '',
        passphrase: ''
      }).catch((error: Error) => {
        expect(error.message).toEqual('invalid mnemonic string')
      })
    })

    test('should reject when no passphrase', async () => {
      await generateKeysFromMnemonicAndPassphrase({
        mnemonic: generateMnemonic()
      }).catch((error: Error) => {
        expect(error).toBeDefined()
      })
    })

    test('should return object with keyStore values', async () => {
      const keystore = await generateKeysFromMnemonicAndPassphrase({
        mnemonic: roppa.mnemonic.join(' '),
        passphrase: roppa.password
      })
      expect(keystore).toEqual(roppaKeystore)
    })
  })

  describe('extractKeysFromSecret', () => {
    test('should extract keys from roppa secret key', () => {
      const result = extractKeysFromSecret(roppaKeystore.privateKey)
      expect(result).toEqual({
        publicKey: roppaKeystore.publicKey,
        privateKey: roppaKeystore.privateKey,
        pkh: roppaKeystore.pkh
      })
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

  describe('hexToBuffer', () => {
    test('should convert a hex string to buffer', () => {
      expect(hexToBuffer('0f0e0d0c')).toEqual(new Uint8Array([15, 14, 13, 12]))
    })
  })

  describe('sign', () => {
    test('should return message signature', async () => {
      const result = await sign({
        message: hexMessage,
        privateKey: roppaKeystore.privateKey,
        watermark: undefined
      })
      expect(result.edsig).toEqual(messageSignature)
    })
    test('should sign a forged message with watermark', async () => {
      const result = await sign({
        message: forgedTransaction,
        privateKey: roppaKeystore.privateKey,
        watermark: 3
      })

      expect(result.edsig).toEqual(transactionSignature)

      expect(
        verify({
          message: `03${forgedTransaction}`,
          signature: result.sig,
          publicKey: roppaKeystore.publicKey
        })
      ).toEqual(true)
    })
  })

  describe('verify', () => {
    test('should return false for invalid signature', async () => {
      const { sig } = await sign({
        message: hexMessage,
        privateKey: roppaKeystore.privateKey,
        watermark: undefined
      })

      expect(
        verify({
          message: '6d657373616764',
          signature: sig,
          publicKey: roppaKeystore.publicKey
        })
      ).toEqual(false)
    })

    test('should return true for valid signature', async () => {
      const { sig } = await sign({
        message: hexMessage,
        privateKey: roppaKeystore.privateKey,
        watermark: undefined
      })

      expect(
        verify({
          signature: sig,
          message: hexMessage,
          publicKey: roppaKeystore.publicKey
        })
      ).toEqual(true)
    })
  })

  describe('forgeAddress', () => {
    test('should convert a tz1 address to hex', () => {
      expect(forgeAddress(transactionSource.contents[0].source)).toEqual(
        forgedAddress
      )
    })
  })

  describe('forgeBranch', () => {
    test('should convert a branch has to hex', () => {
      expect(forgeBranch(transactionSource.branch)).toEqual(branch)
    })
  })

  describe('forgeOperation', () => {
    test('should convert an operation object into binary', () => {
      expect(forgeOperation(transactionSource.contents[0])).toEqual(
        '08000002298c03ed7d454a101eb7022bc95f7e5f41ac78d0860303c8010080c2d72f0000e7670f32038107a59a2b9cfefae36ea21f5aa63c00'
      )
    })
  })

  describe('forge', () => {
    test('should begin with forged header, transaction number', () => {
      expect(forge(transactionSource)).toEqual(
        expect.stringContaining(`${branch}08${forgedAddress}`)
      )
    })

    test('should begin with forged header, address, etc', () => {
      expect(forge(transactionSource)).toEqual(forgedTransaction)
    })
  })
})
