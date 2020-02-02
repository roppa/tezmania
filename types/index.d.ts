interface RawKeyStore {
  publicKey: Uint8Array
  privateKey: Uint8Array
  keyType: string
}

interface KeyStore {
  publicKey: string
  privateKey: string
  pkh: string
  keyType: string
  mnemonic: string
}

interface SignObject {
  message: string
  privateKey: string
}

interface VerifyObject {
  signature: string
  message: string
  publicKey: string
}

interface ContractStorage {
  bignum: string
  unistring: string
}

interface Contract {
  balance: string
  delegate: string
  script: string
  counter: string
  signature: string
}
