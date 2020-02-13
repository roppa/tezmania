import axios from 'axios'
import { forge, sign } from '../crypto/crypto'

// Reference: https://tezos.gitlab.io/api/rpc.html#rpc-index

const chains = `/chains/main`
const head = `${chains}/blocks/head`
const header = `${head}/header`
const helpers = `${head}/helpers`
const monitorPath = `/monitor`
const operationPath = `${helpers}/scripts/run_operation`
const simulationPath = `${helpers}/preapply/operations`
const forgePath = `${helpers}/forge/operations`
const constantsPath = `${head}/context/constants`
const contractsPath = `${head}/context/contracts`
const delegatesPath = `${head}/context/delegates`
const votesPath = `${head}/votes`

export const get = (path: string): Promise<any | Error> =>
  axios.get(path).then(result => result.data)

export const post = (path: string, payload: object): Promise<any | Error> =>
  axios
    .post(path, payload, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then((result: any) => result.data)

export const postSimulateOperation = (server: string) => (
  payload: object
): Promise<object | Error> => post(`${server}${simulationPath}`, payload)

export const postOperation = (server: string) => (
  payload: object
): Promise<object | Error> => post(`${server}${operationPath}`, payload)

export const postForgeOperations = (server: string) => (
  operation: OperationMessage
): Promise<string | Error> => post(`${server}${forgePath}`, operation)

export const getChainId = (server: string) => (): Promise<string | Error> =>
  get(`${server}/${chains}/chain_id`)

export const getConstants = (server: string) => (): Promise<
  ConstantsObject | Error
> => get(`${server}/${constantsPath}`)

export const getBootstrapped = (server: string) => (): Promise<
  BootstrappedObject | Error
> => get(`${server}${monitorPath}/bootstrapped`)

export const getBalance = (server: string) => (
  account: string
): Promise<string | Error> =>
  get(`${server}/${contractsPath}/${account}/balance`)

export const getDelegate = (server: string) => (
  contractAddress: string
): Promise<string | Error> =>
  get(`${server}/${contractsPath}/${contractAddress}/delegate`)

export const getDelegates = (server: string) => (): Promise<string | Error> =>
  get(`${server}/${delegatesPath}`)

export const getHead = (server: string) => (): Promise<object | Error> =>
  get(`${server}/${head}`)

export const getHeader = (server: string) => (): Promise<object | Error> =>
  get(`${server}/${header}`)

export const getHeadHash = (server: string) => (): Promise<string | Error> =>
  get(`${server}/${head}/hash`)

export const getManagerKey = (server: string) => (
  address: string
): Promise<string | null | Error> =>
  get(`${server}/${contractsPath}/${address}/manager_key`)

export const getCounter = (server: string) => (
  account: string
): Promise<string | Error> =>
  get(`${server}/${contractsPath}/${account}/counter`)

export const getBaker = (server: string) => (
  tz1Address: string
): Promise<string | Error> => get(`${server}/${delegatesPath}/${tz1Address}`)

export const getBallotList = (server: string) => (): Promise<
  Array<object> | Error
> => get(`${server}/${votesPath}/ballot_list`)

export const getBallots = (server: string) => (): Promise<object | Error> =>
  get(`${server}/${votesPath}/ballots`)

export const getProposals = (server: string) => (): Promise<
  Array<string> | Error
> => get(`${server}/${votesPath}/proposals`)

export const getListings = (server: string) => (): Promise<
  Array<object> | Error
> => get(`${server}/${votesPath}/listings`)

export const getCurrentProposal = (server: string) => (): Promise<
  string | null | Error
> => get(`${server}/${votesPath}/current_proposal`)

export const getCurrentPeriod = (server: string) => (): Promise<
  string | Error
> => get(`${server}/${votesPath}/current_period_kind`)

export const getCurrentQuorum = (server: string) => (): Promise<
  number | Error
> => get(`${server}/${votesPath}/current_quorum`)

export const getContract = (server: string) => (
  contractAddress: string
): Promise<Contract | Error> => get(`${server}/${contractAddress}`)

export const getContractStorage = (server: string) => (
  contractAddress: string
): Promise<ContractStorage | Error> =>
  get(`${server}/${contractAddress}/storage`)

export const transact = (server: string) => async ({
  from,
  to,
  amount,
  fee,
  gasLimit,
  storageLimit,
  privateKey
}: Transaction): Promise<object | Error> => {
  const managerKey = await getManagerKey(server)(from)
  if (!managerKey) {
    throw new Error('manager_key not set')
  }

  const counter = await getCounter(server)(from)
  const { block } = (await getBootstrapped(server)()) as BootstrappedObject
  // const constants = await getConstants(server)()

  const operation = {
    branch: block,
    contents: [
      {
        kind: 'transaction',
        source: from,
        fee,
        counter: (parseInt(counter as string) + 1).toString(),
        gas_limit: gasLimit,
        storage_limit: storageLimit,
        amount,
        destination: to
      }
    ]
  } as OperationMessage

  const { edsig } = await sign({
    message: forge(operation),
    privateKey,
    watermark: 3
  })

  return await postOperation(server)({ ...operation, signature: edsig })
}

export const init = (server: string) => ({
  getChainId: getChainId(server),
  getConstants: getConstants(server),
  getBootstrapped: getBootstrapped(server),
  getBalance: getBalance(server),
  getDelegate: getDelegate(server),
  getDelegates: getDelegates(server),
  getHead: getHead(server),
  getHeader: getHeader(server),
  getHeadHash: getHeadHash(server),
  getManagerKey: getManagerKey(server),
  getCounter: getCounter(server),
  getBaker: getBaker(server),
  getBallotList: getBallotList(server),
  getBallots: getBallots(server),
  getProposals: getProposals(server),
  getListings: getListings(server),
  getCurrentProposal: getCurrentProposal(server),
  getCurrentPeriod: getCurrentPeriod(server),
  getCurrentQuorum: getCurrentQuorum(server),
  getContract: getContract(server),
  getContractStorage: getContractStorage(server),
  postSimulateOperation: postSimulateOperation(server),
  postOperation: postOperation(server),
  postForgeOperations: postForgeOperations(server),
  transact: transact(server)
})
