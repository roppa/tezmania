import axios from 'axios'

// Reference: https://tezos.gitlab.io/api/rpc.html#rpc-index

const server = 'http://127.0.0.1:8732'
const contractsPath = '/chains/main/blocks/head/context/contracts'
const delegatesPath = '/chains/main/blocks/head/context/delegates'

export const getBalance = async (account: string): Promise<string> =>
  await axios
    .get(`${server}${contractsPath}/${account}/balance`)
    .then(response => response.data)

export const getDelegate = async (account: string): Promise<string | Error> =>
  await axios
    .get(`${server}${contractsPath}/${account}/delegate`)
    .then(response => response.data)

export const getDelegates = async (): Promise<string | Error> =>
  await axios.get(`${server}${delegatesPath}`).then(response => response.data)
