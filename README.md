# Tezmania - a Tezos client

Tezmania is a client for Tezos allowing you to query the blockchain, interact with smart contracts and more.

## init

Configure the host

init('http://localhost:8732')

## Crypto

This library uses [libsodium-wrappers-sumo](https://www.npmjs.com/package/libsodium-wrappers-sumo).

## Mnemonics

This library uses [bip39](https://github.com/bitcoinjs/bip39).

### generateMnemonic [string]: string

This is a direct export from [bip39.generateMnemonic](https://github.com/bitcoinjs/bip39).

### validateMnemonic(string): boolean

This function validates a mnemomic string, returning boolean value.

## getKeysFromMnemonicAndPassphrase
