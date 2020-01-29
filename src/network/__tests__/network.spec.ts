import { getBalance, getDelegate, getDelegates } from '../network'

describe('network', () => {
  describe('getBalance', () => {
    test('should get balance for account', async () => {
      expect(await getBalance('tz1ipQzB7tXwafCZn9hJBsJLqrAHWKjK6FNd')).toEqual(
        '23892354330'
      )
    })
  })

  describe('getDelegates', () => {
    test('should return list of delegates', async () => {
      expect(await getDelegates()).toEqual([])
    })
  })

  describe('getDelegate', () => {
    test('should return error for invalid delegate', async () => {
      await expect(getDelegate('unknown')).rejects.toThrow()
    })
  })
})
