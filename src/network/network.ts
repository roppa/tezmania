import axios from 'axios'

// Reference: https://tezos.gitlab.io/api/rpc.html#rpc-index

const head = '/chains/main/blocks/head'
const header = `${head}/header`
const contractsPath = `${head}/context/contracts`
const delegatesPath = `${head}/context/delegates`

const doGet = (path: string) => axios.get(path).then(result => result.data)

export const getBalance = (server: string) => (
  account: string
): Promise<string | Error> =>
  doGet(`${server}${contractsPath}/${account}/balance`)

export const getDelegate = (server: string) => (
  account: string
): Promise<Array<string> | Error> =>
  doGet(`${server}${contractsPath}/${account}/delegate`)

export const getDelegates = (server: string) => (): Promise<string | Error> =>
  doGet(`${server}${delegatesPath}`)

export const getBaker = (server: string) => (
  tz1Address: string
): Promise<string | Error> => doGet(`${server}${delegatesPath}/${tz1Address}`)

export const getHead = (server: string) => (): Promise<string | Error> =>
  doGet(`${server}/${head}`)

export const getHeadHash = (server: string) => (): Promise<string | Error> =>
  doGet(`${server}/${head}/hash`)

export const getHeader = (server: string) => (): Promise<string | Error> =>
  doGet(`${server}/${header}`)

export const getManager = (server: string) => (
  address: string
): Promise<string | Error> =>
  doGet(`${server}/${contractsPath}/${address}/manager_key`)

export const getCounter = (server: string) => (
  account: string
): Promise<string | Error> =>
  doGet(`${server}/${contractsPath}/${account}/counter`)

export const init = (server: string) => ({
  getBalance: getBalance(server),
  getDelegate: getDelegate(server),
  getDelegates: getDelegates(server),
  getHead: getHead(server),
  getHeader: getHeader(server),
  getHeadHash: getHeadHash(server),
  getManager: getManager(server),
  getCounter: getCounter(server),
  getBaker: getBaker(server)
})
