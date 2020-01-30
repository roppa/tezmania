import axios from 'axios'

import { init } from '../network'

const net = init(
  'http://127.0.0.1:8732'
)

jest.mock('axios')

describe('network', () => {
  describe('getBalance', () => {
    test('should get balance for account', async () => {
      ;(<jest.Mock>axios.get).mockImplementationOnce(async () => ({
        data: '23892354330'
      }))

      expect(await net.getBalance('tz1ipQzB7tXwafCZn9hJBsJLqrAHWKjK6FNd')).toEqual(
        '23892354330'
      )
    })
  })

  describe('getDelegate', () => {
    test('should return valid delegate', async () => {
      ;(<jest.Mock>axios.get).mockImplementationOnce(async () => ({
        data: 'abc'
      }))
      expect(await net.getDelegate('known')).toEqual('abc')
    })

    test('should throw error for invalid delegate', async () => {
      ;(<jest.Mock>axios.get).mockImplementationOnce(async () => {
        throw new Error()
      })
      await expect(net.getDelegate('unknown')).rejects.toThrow()
    })
  })

  describe('getDelegates', () => {
    test('should return list of delegates', async () => {
      ;(<jest.Mock>axios.get).mockImplementationOnce(async () => ({
        data: []
      }))
      expect(await net.getDelegates()).toEqual([])
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
      expect(await net.getHead()).toEqual(expect.objectContaining({
        chain_id: expect.any(String),
        hash: expect.any(String),
        header: expect.any(Object),
        metadata: expect.any(Object),
        operations: expect.any(Array),
      })))
  })

  describe('getHeader', () => {
    test('should return header', async () => {
      const header = {
          protocol: 'PsBabyM1eUXZseaJdmXFApDSBqj8YBfwELoxZHHW77EMcAbbwAS',
          chain_id: 'NetXUdfLh6Gm88t',
          hash: 'BLZW4mNCVasZjYhfpSLwu9XxQrYdAAscL1KXNh2mMDsTxPThquk',
          level: 249397,
          proto: 1,
          predecessor: 'BKxCXwDCFEv482eFf2qDgJHS2SSEwENwbybzC1BVgFGNSWaCCfw',
          timestamp: '2020-01-30T11:50:46Z',
          validation_pass: 4,
          operations_hash: 'LLoacWMv5EqMyFGv26qf2CRDYJRvtchBZoNqTwdqG49znTMZFcSTG',
          fitness: ['01', '000000000003ce34'],
          context: 'CoVnRLeKBwhw3BWGUNCkh3Vx7KRn1366iZ9bcawa2vzfXBsu4mSL',
          priority: 1,
          proof_of_work_nonce: '1db34e40e6fee08b',
          signature:
            'sigZN1guXU9Xcn6xgQ52xVsaYYRz9vJkXj1sNptUjFRxgJDkiqG6bjqXKaF12KCJSaxZgL14TofZDxHnVwUqaihSLVpduTQp'
        }
      ;(<jest.Mock>axios.get).mockImplementationOnce(async () => ({
        data: header
      }))
      expect(await net.getHeader()).toEqual(header)
    })
  })

  describe('getHeadHash', () => {
    test('should return hash', async () => {
      ;(<jest.Mock>axios.get).mockImplementationOnce(async () => ({
        data: 'hash'
      }))
      expect(await net.getHeadHash()).toBe('hash')
    })
  })

  describe('getManager', () => {
    test('should return manager address', async () => {
      ;(<jest.Mock>axios.get).mockImplementationOnce(async () => ({
        data: 'manager'
      }))
      expect(await net.getManager('address')).toBe('manager')
    })
  })

  describe('getCounter', () => {
    test('should return string (bignumber)', async () => {
      ;(<jest.Mock>axios.get).mockImplementationOnce(async () => ({
        data: 'bignumstring'
      }))
      expect(await net.getCounter('address')).toBe('bignumstring')
    })
  })

 describe('getBaker', () => {
    test('should return valid baker', async () => {
      ;(<jest.Mock>axios.get).mockImplementationOnce(async () => ({
        data: 'baker'
      }))
      expect(await net.getBaker('tz1address')).toEqual('baker')
    })
  })

  describe('getBallotList', () => {
    test('should return an array of ballots', async () => {
      ;(<jest.Mock>axios.get).mockImplementationOnce(async () => ({
        data: []
      }))
      expect(await net.getBallotList()).toEqual([])
    })
  })

  describe('getBallots', () => {
    test('should return an object of yay/nay/pass', async () => {
      const ballot = {
          yay: 0,
          nay: 0,
          pass: 0
      }
      ;(<jest.Mock>axios.get).mockImplementationOnce(async () => ({ data: ballot }))
      expect(await net.getBallots()).toEqual(ballot)
    })
  })

  describe('getProposals', () => {
    test('should return an array of proposals', async () => {
      ;(<jest.Mock>axios.get).mockImplementationOnce(async () => ({
        data: []
      }))
      expect(await net.getProposals()).toEqual([])
    })
  })

  describe('getListings', () => {
    test('should return an array of vote listings', async () => {
      ;(<jest.Mock>axios.get).mockImplementationOnce(async () => ({
        data: []
      }))
      expect(await net.getListings()).toEqual([])
    })
  })

  describe('getCurrentProposal', () => {
    test('should return current proposal', async () => {
      ;(<jest.Mock>axios.get).mockImplementationOnce(async () => ({
        data: 'proposal'
      }))
      expect(await net.getCurrentProposal()).toEqual('proposal')
    })
  })

  describe('getCurrentPeriod', () => {
    test('should return an array of current proposals', async () => {
      // one of proposal, testing_vote, testing, promotion_vote
      ;(<jest.Mock>axios.get).mockImplementationOnce(async () => ({
        data: 'proposal'
      }))
      expect(await net.getCurrentPeriod()).toEqual('proposal')
    })
  })

  describe('getCurrentQuorum', () => {
    test('should number of votes on current quorum', async () => {
      ;(<jest.Mock>axios.get).mockImplementationOnce(async () => ({
        data: 0
      }))
      expect(await net.getCurrentQuorum()).toEqual(0)
    })
  })

})
