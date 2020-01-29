import axios from 'axios'

// Reference: https://tezos.gitlab.io/api/rpc.html#rpc-index

const head = '/chains/main/blocks/head'
const contractsPath = `${head}/context/contracts`
const delegatesPath = `${head}/context/delegates`

export const getBalance = (server: string) => async (
  account: string
): Promise<string | Error> =>
  await axios
    .get(`${server}${contractsPath}/${account}/balance`)
    .then(response => response.data)

export const getDelegate = (server: string) => async (
  account: string
): Promise<Array<string> | Error> =>
  await axios
    .get(`${server}${contractsPath}/${account}/delegate`)
    .then(response => response.data)

export const getDelegates = (server: string) => async (): Promise<
  string | Error
> =>
  await axios.get(`${server}${delegatesPath}`).then(response => response.data)

export const getHead = (server: string) => async (): Promise<string | Error> =>
  await axios.get(`${server}/${head}`).then(response => response.data)

export const getHeadHash = (server: string) => async (): Promise<
  string | Error
> => await axios.get(`${server}/${head}/hash`).then(response => response.data)

export const init = (server: string) => ({
  getBalance: getBalance(server),
  getDelegate: getDelegate(server),
  getDelegates: getDelegates(server),
  getHead: getHead(server),
  getHeadHash: getHeadHash(server)
})
