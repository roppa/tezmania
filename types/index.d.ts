interface RawKeyStore {
  publicKey: Uint8Array
  privateKey: Uint8Array
  keyType: string
}

interface KeyStore {
  publicKey: string
  privateKey: string
  keyType: string
}
