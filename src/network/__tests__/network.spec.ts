import axios from 'axios'

import { init } from '../network'
import { forgedOperation, transactionParams, operation, headHash, transactionResponse } from '../../__mocks__'

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

  describe('getConstants', () => {
    const constantsExample = {
      proof_of_work_nonce_size: 8,
      nonce_length: 32,
      max_revelations_per_block: 32,
      max_operation_data_length: 16384,
      max_proposals_per_delegate: 20,
      preserved_cycles: 3,
      blocks_per_cycle: 2048,
      blocks_per_commitment: 32,
      blocks_per_roll_snapshot: 256,
      blocks_per_voting_period: 8192,
      time_between_blocks: ['30', '40'],
      endorsers_per_block: 32,
      hard_gas_limit_per_operation: '800000',
      hard_gas_limit_per_block: '8000000',
      proof_of_work_threshold: '70368744177663',
      tokens_per_roll: '8000000000',
      michelson_maximum_type_size: 1000,
      seed_nonce_revelation_tip: '125000',
      origination_size: 257,
      block_security_deposit: '512000000',
      endorsement_security_deposit: '64000000',
      block_reward: '16000000',
      endorsement_reward: '2000000',
      cost_per_byte: '1000',
      hard_storage_limit_per_operation: '60000',
      test_chain_duration: '86400',
      quorum_min: 3000,
      quorum_max: 7000,
      min_proposal_quorum: 500,
      initial_endorsers: 24,
      delay_per_missing_endorsement: '2'
    }
  test('should return constants object', async () => {
      ;(<jest.Mock>axios.get).mockImplementationOnce(async () => ({
        data: constantsExample
      }))
      expect(await net.getConstants()).toEqual(constantsExample)
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

  describe('getManagerKey', () => {
    test('should return manager key', async () => {
      const managerKey = {
        manager: 'address',
        key: 'publicKey'
      }
      ;(<jest.Mock>axios.get).mockImplementationOnce(async () => ({
        data: managerKey
      }))
      expect(await net.getManagerKey('address')).toEqual(managerKey)
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

  describe('storage', () => {
    test('should return storage information for contract address', async () => {
        const data = {
          bignum: '0',
          unistring: ''
        }
        ;(<jest.Mock>axios.get).mockImplementationOnce(async () => ({
          data
        }))
        expect(await net.getContractStorage('contractAddress')).toEqual(data)
    })
  })

  describe('contract', () => {
    test('should return contract information for contract address', async () => {
        const data = {
          balance: '0',
          delegate: 'xxx',
          script: 'xxx',
          counter: '0',
          signature: 'xx',
        }
        ;(<jest.Mock>axios.get).mockImplementationOnce(async () => ({
          data
        }))
        expect(await net.getContract('contractAddress')).toEqual(data)
    })
  })

  describe('bootstrapped', () => {
    test('bootstrapped', async () => {
      const bootstrappedData = {
        block: 'block',
        timestamp: 'yyyy-mm-ddThh:mm:ssZ'
      }
      ;(<jest.Mock>axios.get).mockImplementationOnce(async () => ({
          data: bootstrappedData
      }))
      expect(await net.getBootstrapped()).toEqual(bootstrappedData)
    })
  })

  describe('getChainId', () => {
    test('getChainId', async () => {
      ;(<jest.Mock>axios.get).mockImplementationOnce(async () => ({
          data: 'chainid'
      }))
      expect(await net.getChainId()).toEqual('chainid')
    })
  })

  describe('postForgeOperations', () => {
    test('should return forged string from object', async () => {
      ;(<jest.Mock>axios.post).mockImplementationOnce(async () => ({
          data: forgedOperation
      }))
      expect(await net.postForgeOperations(operation)).toEqual(forgedOperation)
    })
  })

  describe('post operations - simulate, operation', () => {
  test('should dry run a transaction', async () => {
      const simulationResponse = {}
      ;(<jest.Mock>axios.post).mockImplementationOnce(async () => ({
          data: simulationResponse
      }))
      expect(await net.postSimulateOperation({})).toEqual(simulationResponse)
    })
  test('should post a transaction', async () => {
      const response = {}
      ;(<jest.Mock>axios.post).mockImplementationOnce(async () => ({
          data: response
      }))
      expect(await net.postOperation({})).toEqual(response)
    })
  })

  describe('transact', () => {


    test('should throw if manager_key does not exist', async () => {
      ;(<jest.Mock>axios.get).mockImplementationOnce(async () => ({
        data: undefined
      }))
      await expect(net.transact({})).rejects.toThrow('manager_key not set')
    })

    test('should perform a transaction', async () => {
      ;(<jest.Mock>axios.get).mockImplementationOnce(async () => ({
        data: 'edpkuqLhJdGGF4u9qvMqQHgLsA2w4usQTFPYzoasUHpt5kN7sG4ZeT'
      }))
      ;(<jest.Mock>axios.get).mockImplementationOnce(async () => ({
        data: '2'
      }))
      ;(<jest.Mock>axios.get).mockImplementationOnce(async () => ({
        data: {
          block: headHash,
          timestamp: '2020-02-13T10:43:12Z'
        }
      }))
      ;(<jest.Mock>axios.get).mockImplementationOnce(async () => ({
        data: 'chain_id'
      }))
      ;(<jest.Mock>axios.post).mockImplementationOnce(async () => ({
        data: transactionResponse
      }))

      expect(await net.transact(transactionParams))
        .toEqual(transactionResponse)
    })
  })

})
