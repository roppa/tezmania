# Tezmania - a Tezos client

Tezmania is a client for Tezos allowing you to query the blockchain, interact with smart contracts and more. This is mainly a tool for learning, so if you are learning about Tezos I'm working on [some resources in the 'learning' folder](/learning).

## init (network functions)

Configure (curry) the host network:

```js
const net = tezmania.init('http://localhost:8732')
net.getHead().then(head => console.log(head))
```

This returns the curried functions belonging to the network file (`/src/network`). This applies to any of the functions in the network section.

In exported format, the functions below are curried i.e.:

```js
tezmania.getHead('http://localhost:8732')()
```

### getBalance(account: string): string

Returns balance for account.

### getDelegate(contractAddress: string): string

### getDelegates(): string

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

## Credits

Sources of reference (and pure theft) are these cool projects:

- [Sotez](https://github.com/AndrewKishino/sotez)
- [eztz](https://github.com/TezTech/eztz)
- [ConseilJS](https://github.com/Cryptonomic/ConseilJS)
