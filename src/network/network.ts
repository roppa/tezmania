import axios from 'axios'
import { forge, sign } from '../crypto/crypto'

// Reference: https://tezos.gitlab.io/api/rpc.html#rpc-index

export const chains = `/chains/main`
export const head = `${chains}/blocks/head`
export const header = `${head}/header`
export const helpers = `${head}/helpers`
export const monitorPath = `/monitor`
export const operationPath = `${helpers}/scripts/run_operation`
export const simulationPath = `${helpers}/preapply/operations`
export const forgePath = `${helpers}/forge/operations`
export const constantsPath = `${head}/context/constants`
export const contractsPath = `${head}/context/contracts`
export const delegatesPath = `${head}/context/delegates`
export const votesPath = `${head}/votes`

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
  get(`${server}${chains}/chain_id`)

export const getConstants = (server: string) => (): Promise<
  ConstantsObject | Error
> => get(`${server}${constantsPath}`)

export const getBootstrapped = (server: string) => (): Promise<
  BootstrappedObject | Error
> => get(`${server}${monitorPath}/bootstrapped`)

export const getBalance = (server: string) => (
  account: string
): Promise<string | Error> =>
  get(`${server}${contractsPath}/${account}/balance`)

export const getDelegate = (server: string) => (
  contractAddress: string
): Promise<string | Error> =>
  get(`${server}${contractsPath}/${contractAddress}/delegate`)

export const getDelegates = (server: string) => (): Promise<string | Error> =>
  get(`${server}${delegatesPath}`)

export const getHead = (server: string) => (): Promise<HeadObject | Error> =>
  get(`${server}${head}`)

export const getHeader = (server: string) => (): Promise<object | Error> =>
  get(`${server}${header}`)

export const getHeadHash = (server: string) => (): Promise<string | Error> =>
  get(`${server}${head}/hash`)

export const getManagerKey = (server: string) => (
  address: string
): Promise<string | null | Error> =>
  get(`${server}${contractsPath}/${address}/manager_key`)

export const getCounter = (server: string) => (
  account: string
): Promise<string | Error> =>
  get(`${server}${contractsPath}/${account}/counter`)

export const getBaker = (server: string) => (
  tz1Address: string
): Promise<string | Error> => get(`${server}${delegatesPath}/${tz1Address}`)

export const getBallotList = (server: string) => (): Promise<
  Array<object> | Error
> => get(`${server}${votesPath}/ballot_list`)

export const getBallots = (server: string) => (): Promise<object | Error> =>
  get(`${server}${votesPath}/ballots`)

export const getProposals = (server: string) => (): Promise<
  Array<string> | Error
> => get(`${server}${votesPath}/proposals`)

export const getListings = (server: string) => (): Promise<
  Array<object> | Error
> => get(`${server}${votesPath}/listings`)

export const getCurrentProposal = (server: string) => (): Promise<
  string | null | Error
> => get(`${server}${votesPath}/current_proposal`)

export const getCurrentPeriod = (server: string) => (): Promise<
  string | Error
> => get(`${server}${votesPath}/current_period_kind`)

export const getCurrentQuorum = (server: string) => (): Promise<
  number | Error
> => get(`${server}${votesPath}/current_quorum`)

export const getContract = (server: string) => (
  contractAddress: string
): Promise<Contract | Error> =>
  Promise.all([
    get(`${server}${contractsPath}/${contractAddress}`),
    get(`${server}${contractsPath}/${contractAddress}/entrypoints`)
  ]).then(result => ({ ...result[0], ...result[1] }))

export const getContractStorage = (server: string) => (
  contractAddress: string
): Promise<ContractStorage | Error> =>
  get(`${server}${contractsPath}/${contractAddress}/storage`)

export const transact = (server: string) => async ({
  from,
  to,
  amount,
  fee,
  gasLimit,
  storageLimit,
  privateKey,
  parameters
}: Transaction): Promise<object | Error> => {
  const managerKey = await getManagerKey(server)(from)
  if (!managerKey) {
    throw new Error('manager_key not set')
  }

  const counter = await getCounter(server)(from)
  const { block } = (await getBootstrapped(server)()) as BootstrappedObject
  const chain_id = await getChainId(server)()

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

  return await postOperation(server)({
    operation: { ...operation, signature: edsig },
    chain_id
  })
}

export const getContractEntrypoints = (server: string) => (
  contractAddress: string
): Promise<Contract | Error> =>
  get(`${server}${contractsPath}/${contractAddress}/entrypoints`)

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
  transact: transact(server),
  getContractEntrypoints: getContractEntrypoints(server)
})
