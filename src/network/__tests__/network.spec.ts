import axios from 'axios'

import { init } from '../network'

const { getBalance, getDelegate, getDelegates, getHead, getHeadHash } = init(
  'http://127.0.0.1:8732'
)

jest.mock('axios')

describe('network', () => {
  describe('getBalance', () => {
    test('should get balance for account', async () => {
      ;(<jest.Mock>axios.get).mockImplementationOnce(async () => ({
        data: '23892354330'
      }))

      expect(await getBalance('tz1ipQzB7tXwafCZn9hJBsJLqrAHWKjK6FNd')).toEqual(
        '23892354330'
      )
    })
  })

  describe('getDelegates', () => {
    test('should return list of delegates', async () => {
      ;(<jest.Mock>axios.get).mockImplementationOnce(async () => ({
        data: []
      }))
      expect(await getDelegates()).toEqual([])
    })
  })

  describe('getDelegate', () => {
    test('should return valid delegate', async () => {
      ;(<jest.Mock>axios.get).mockImplementationOnce(async () => ({
        data: 'abc'
      }))
      expect(await getDelegate('known')).toEqual('abc')
    })

    test('should throw error for invalid delegate', async () => {
      ;(<jest.Mock>axios.get).mockImplementationOnce(async () => {
        throw new Error()
      })
      await expect(getDelegate('unknown')).rejects.toThrow()
    })
  })

  describe('getHead', () => {
    test('should return current head', async () => {
      ;(<jest.Mock>axios.get).mockImplementationOnce(async () => ({
        data: {
          chain_id: '',
          hash: '',
          header: {},
          metadata: {},
          operations: []
        }
      }))
      expect(await getHead()).toEqual(expect.objectContaining({
        chain_id: expect.any(String),
        hash: expect.any(String),
        header: expect.any(Object),
        metadata: expect.any(Object),
        operations: expect.any(Array),
      })))
  })

  describe('getHeadHash', () => {
    test('should return hash', async () => {
      ;(<jest.Mock>axios.get).mockImplementationOnce(async () => ({
        data: 'hash'
      }))
      expect(typeof await getHeadHash()).toBe('string')
    })
  })
})
