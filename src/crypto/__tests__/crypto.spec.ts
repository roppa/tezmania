import {
  generateKeysFromMnemonicAndPassphrase,
  extractKeysFromPrivateKey,
  bufferToHex,
  sign,
  verify,
  forgeAddress,
  forgeBranch,
  forgeOperation
  forge
} from '../crypto'
import { generateMnemonic } from '../../mnemonic/mnemonic'

const stubKeystore = {
  mnemonic: 'utility orbit end win roast sail warrior toast cross banana news gossip swap theme piece'
  publicKey: 'edpkvFMQpH8CBZeXxyrYBFc3LH8zc3dC6qhzRzuiZXvGd8oxiQrXQo'
  privateKey: 'edskS3EdqCCLLsxNhLXoVVBtFzqJEXkNcJeNriPDSdn22yJgET8grjzcRrQ2bnJ9zYTdfZTUfSsMdC76FGNZE5wsLDuXfc4fJ8',
  pkh: 'tz1X7JKJ114Btq3Mbz62NJxJSrmWPo4guFVq'
  keyType: 'ed25519'
}

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

const branch = 'ce69c5713dac3537254e7be59759cf59c15abd530d10501ccf9028a5786314cf'

const messageSignature = 'sigg9YBuaGsJgZTzCM9mKv5hWLdte6qLfm8BuYih5VwBnN8MwLvJKDqMFJ1fhnWuz94GZot2YMJMuF8yE3gFjdckZqhTovvV'

describe('Crypto library', () => {
  describe('generateKeysFromMnemonicAndPassphrase', () => {
    test('should reject when no mnemonic', async () => {
      await generateKeysFromMnemonicAndPassphrase({ mnemonic: '', passphrase: ''}).catch((error: Error) => {
        expect(error.message).toEqual('invalid mnemonic string')
      })
    })
    test('should reject when no passphrase', async () => {
      await generateKeysFromMnemonicAndPassphrase({ mnemonic: generateMnemonic() }).catch(
        (error: Error) => {
          expect(error).toBeDefined()
        }
      )
    })
    test('should return object with keyStore values', async () => {
      const keystore = await generateKeysFromMnemonicAndPassphrase({
        mnemonic: stubKeystore.mnemonic,
        passphrase: 'password'
      })
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

  describe('forgeAddress', () => {
    test('should convert a tz1 address to hex', () => {
      expect(forgeAddress(transactionSource.contents[0].source)).toEqual(forgedAddress)
    })
  })

  describe('forgeBranch', () => {
    test('should convert a branch has to hex', () => {
      expect(forgeBranch(transactionSource.branch)).toEqual(branch)
    })
  })

  describe.skip('forgeOperation', () => {
    test('should convert an operation object into binary', () => {
      expect(forgeOperation(transactionSource.contents[0])).toEqual('')
    })
  })

  describe('forge', () => {
  test('should begin with forged header, transaction number', () => {
      expect(forge(transactionSource)).toEqual(expect.stringContaining(`${branch}08${forgedAddress}`))
    })

  test('should begin with forged header and ...', () => {
      const expected = `${branch}08000002298c03ed7d454a101eb7022bc95f7e5f41ac78d0860303c8010080c2d72f0000e7670f32038107a59a2b9cfefae36ea21f5aa63c00`
      expect(forge(transactionSource)).toEqual(expected)
    })
  })
})
