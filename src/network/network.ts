import axios from 'axios'

// Reference: https://tezos.gitlab.io/api/rpc.html#rpc-index

const head = '/chains/main/blocks/head'
const header = `${head}/header`
const contractsPath = `${head}/context/contracts`
const delegatesPath = `${head}/context/delegates`
const votesPath = `${head}/votes`

const doGet = (path: string) => axios.get(path).then(result => result.data)

export const getBalance = (server: string) => (
  account: string
): Promise<string | Error> =>
  doGet(`${server}${contractsPath}/${account}/balance`)

export const getDelegate = (server: string) => (
  contractAddress: string
): Promise<string | Error> =>
  doGet(`${server}${contractsPath}/${contractAddress}/delegate`)

export const getDelegates = (server: string) => (): Promise<string | Error> =>
  doGet(`${server}${delegatesPath}`)

export const getHead = (server: string) => (): Promise<object | Error> =>
  doGet(`${server}/${head}`)

export const getHeader = (server: string) => (): Promise<object | Error> =>
  doGet(`${server}/${header}`)

export const getHeadHash = (server: string) => (): Promise<string | Error> =>
  doGet(`${server}/${head}/hash`)

export const getManager = (server: string) => (
  address: string
): Promise<string | Error> =>
  doGet(`${server}/${contractsPath}/${address}/manager_key`)

export const getCounter = (server: string) => (
  account: string
): Promise<string | Error> =>
  doGet(`${server}/${contractsPath}/${account}/counter`)

export const getBaker = (server: string) => (
  tz1Address: string
): Promise<string | Error> => doGet(`${server}${delegatesPath}/${tz1Address}`)

export const getBallotList = (server: string) => (): Promise<
  Array<object> | Error
> => doGet(`${server}/${votesPath}/ballot_list`)

export const getBallots = (server: string) => (): Promise<object | Error> =>
  doGet(`${server}/${votesPath}/ballots`)

export const getProposals = (server: string) => (): Promise<
  Array<string> | Error
> => doGet(`${server}/${votesPath}/proposals`)

export const getListings = (server: string) => (): Promise<
  Array<object> | Error
> => doGet(`${server}/${votesPath}/listings`)

export const getCurrentProposal = (server: string) => (): Promise<
  string | null | Error
> => doGet(`${server}/${votesPath}/current_proposal`)

export const getCurrentPeriod = (server: string) => (): Promise<
  string | Error
> => doGet(`${server}/${votesPath}/current_period_kind`)

export const getCurrentQuorum = (server: string) => (): Promise<
  number | Error
> => doGet(`${server}/${votesPath}/current_quorum`)

export const getContract = (server: string) => (
  contractAddress: string
): Promise<Contract | Error> => doGet(`${server}/${contractAddress}`)

export const getContractStorage = (server: string) => (
  contractAddress: string
): Promise<ContractStorage | Error> =>
  doGet(`${server}/${contractAddress}/storage`)

export const init = (server: string) => ({
  getBalance: getBalance(server),
  getDelegate: getDelegate(server),
  getDelegates: getDelegates(server),
  getHead: getHead(server),
  getHeader: getHeader(server),
  getHeadHash: getHeadHash(server),
  getManager: getManager(server),
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
  getContractStorage: getContractStorage(server)
})
