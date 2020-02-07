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

// example account from faucet
const roppa = {
  mnemonic: [
    'exercise',
    'situate',
    'gallery',
    'random',
    'fragile',
    'purpose',
    'elevator',
    'odor',
    'friend',
    'cage',
    'occur',
    'aim',
    'attract',
    'horror',
    'stool'
  ],
  secret: '983142fbeba332140dbb4a8d4d5749c279ae2587',
  amount: '23892354330',
  pkh: 'tz1ipQzB7tXwafCZn9hJBsJLqrAHWKjK6FNd',
  password: 'oBKWAWiGgE',
  email: 'rzqhubtg.lixdjury@tezos.example.org'
}

const roppaKeystore = {
  mnemonic: roppa.mnemonic.join(' '),
  publicKey: 'edpku2xJnryQwRBr11CQC9FaqZrB6K23KdkzQbu5XEqAtM8vHyVqtr',
  pkh: 'tz1R5ce7MiHEpTfnUTePA5Bv4Mzq1uG13YMU',
  privateKey:
    'edskRkdTqB1GNzBtwnCUA4KX6gfS8oRWCuKdLZmYzgrRgGbwqswtbZeY59q5DxfNZahgV1B6V8eyZ79FpU4687cR9Qve6kXRWc',
  keyType: 'ed25519'
}

const hexMessage = Buffer.from('message', 'ascii').toString('hex')

const messageSignature =
  'edsigu1XwSv9d1F1vpiQSCc7wN93R9euRX6MnJxSB8ASFH4tBqihfnhuvfCRBgCyh8ynKk9BmeU5nCG5DFhemfGGG8LfmTwwG7d'

const transactionSource = {
  branch: 'BMHBtAaUv59LipV1czwZ5iQkxEktPJDE7A9sYXPkPeRzbBasNY8',
  contents: [
    {
      kind: 'transaction',
      source: 'tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx',
      fee: '50000',
      counter: '3',
      gas_limit: '200',
      storage_limit: '0',
      amount: '100000000',
      destination: 'tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN'
    }
  ]
}
const forgedAddress = '000002298c03ed7d454a101eb7022bc95f7e5f41ac78'
const branch =
  'ce69c5713dac3537254e7be59759cf59c15abd530d10501ccf9028a5786314cf'
const forgedTransaction = `ce69c5713dac3537254e7be59759cf59c15abd530d10501ccf9028a5786314cf08000002298c03ed7d454a101eb7022bc95f7e5f41ac78d0860303c8010080c2d72f0000e7670f32038107a59a2b9cfefae36ea21f5aa63c00`

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
    test('should return message signature', () => {
      const result = sign({
        message: hexMessage,
        privateKey: roppaKeystore.privateKey,
        watermark: undefined
      })
      expect(result.edsig).toEqual(messageSignature)
    })
  })

  describe('verify', () => {
    test('should return false for invalid signature', () => {
      const { sig } = sign({
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

    test('should return true for valid signature', () => {
      const { sig } = sign({
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
