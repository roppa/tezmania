import { generateMnemonic, validateMnemonic } from '../mnemonic'

describe('Mnemonic library', () => {
  describe('generateMnemonic', () => {
    test('should return a string', () => {
      expect(generateMnemonic().split(/\s+/g).length).toBeGreaterThanOrEqual(12)
    })
  })

  describe('validateMnemonic', () => {
    test('should return true for valid mnemonic', () => {
      expect(validateMnemonic(generateMnemonic())).toBe(true)
      expect(validateMnemonic('invalid')).toBe(false)
      expect(validateMnemonic()).toBe(false)
    })
  })
})
