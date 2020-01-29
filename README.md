# Tezmania - a Tezos client

Tezmania is a client for Tezos allowing you to query the blockchain, interact with smart contracts and more.

## init (network functions)

Configure (curry) the host network:

```js
init('http://localhost:8732')
```

This returns the curried functions belonging to the network file (`/src/network`).

In exported format, the functions below are curried i.e.:

```js
getHead('http://localhost:8732')()
```

To use any of the below you can do something like:

```js
const net = tezmania.init('http://localhost:8732')
net.getHead().then(head => console.log(head))
```

### getBalance(account: string)

### getDelegates

### getDelegate

### getHead

### getHeadHash

## Crypto

This library uses [libsodium-wrappers-sumo](https://www.npmjs.com/package/libsodium-wrappers-sumo).

### readPublicKey

### publicKeyFromBuffer

### privateKeyFromBuffer

### getKeysFromMnemonicAndPassphrase

## Mnemonics

This library uses [bip39](https://github.com/bitcoinjs/bip39).

### generateMnemonic [string]: string

This is a direct export from [bip39.generateMnemonic](https://github.com/bitcoinjs/bip39).

### validateMnemonic(string): boolean

This function validates a mnemomic string, returning boolean value.
