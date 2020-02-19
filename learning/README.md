## Learning about Blockchain and Tezos

Like any blockchain (IMHO) there is a bit of a learning curve. Same with Tezos as it differs to most blockchains. For beginners I am using this app as a resource for understanding the basics through to advanced.

## What is a blockchain

If you are new to blockchain, checkout the [executive overview](./EXECUTIVE-OVERVIEW.md) to get a broad understanding of blockchain.

## What is Tezos

Tezos was created by Arthur Breitman. The name 'Tezos' came from Breitman’s algorithm to find unique domains.

In the whitepaper, Tezos is describes as a distributed blockchain that 'governs itself by establishing a true digital commonwealth'. What does that mean?

Other blockchains such as Bitcoin (and all flavours of), Ethereum, etc all have developers working and contributing to the code and protocol as part of the organisation itself. This kind of defeats the purpose of decentralised. You could say that anyone could contribute to the codebase, but ultimately the central organisation has the say on what is committed. The difference with Tezos is that it is the first self-amending cryptocurrency - meaning the developers could be anyone, and changes to be included into the protocol are voted in by the community. You can [read a lovely short overview based on meetings the OCaml team had](https://ocaml.org/meetings/ocaml/2017/.extended-abstract__2017__benjamin-canou_gregoire-henry_pierre-chambart_fabrice-le-fessant_arthur-breitman__tezos-the-ocaml-crypto-ledger.pdf)

## Definitions

A full [glossary is available on Tezos.gitlab](https://tezos.gitlab.io/user/glossary.html).

## Basics

Low level data formats:

- [Types - binary, hex, buffer, and base58](./TYPES.md)

## Running Tezos locally

- [Setting up a Tezos network](./SETUP.md)

## Creating a transaction

- [Transactions](./TRANSACTIONS.md)

## Forging

Forging basically means converting information into binary, in a structure that is used in peer-to-peer messaging.

## Smart Contracts

[Smart contracts](./SMART-CONTRACTS.md)

List all contracts:

```
./babylonnet.sh client list known contracts
```

## Michelson, OCaml, Liquidity and Fi

## Baking

## Learning resources

- [Tezoscapstone](https://tezoscapstone.com)
- [Bitcoin whitepaper](https://bitcoin.org/bitcoin.pdf/)
- [Proof of work system](https://en.wikipedia.org/wiki/Proof-of-work_system/)
- [Proof of stake](https://en.wikipedia.org/wiki/Proof-of-stake/)
- [Constraints and tradeoffs in network communications](http://hydra.infosys.tuwien.ac.at/teaching/courses/AdvancedDistributedSystems/download/1975_Akkoyunlu,%20Ekanadham,%20Huber_Some%20constraints%20and%20tradeoffs%20in%20the%20design%20of%20network%20communications.pdf)
- [Byzantine Generals Problem](https://marknelson.us/posts/2007/07/23/byzantine.html)
- [What is a 51% attack](https://medium.com/coinmonks/what-is-a-51-attack-or-double-spend-attack-aa108db63474/)
- [Public key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography/)
- [Elliptic curve cryptography](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography/)
- [P2P](https://en.wikipedia.org/wiki/Peer-to-peer/)
- [Game theory in cryptocurrency](https://blockgeeks.com/guides/cryptocurrency-game-theory//)
- [Merkle trees](https://hackernoon.com/merkle-trees-181cb4bc30b4/)
- [What is ethereum classic](https://blockgeeks.com/guides/what-is-ethereum-classic//)
- [Smart Contracts](https://blockchainhub.net/smart-contracts//)
- [Ethereum white paper](https://github.com/ethereum/wiki/wiki/White-Paper/)
- [Tezos - the big picture](http://tezos.gitlab.io/mainnet/whitedoc/the_big_picture.html#the-big-picture/)
- [Tezos proof of stake](http://tezos.gitlab.io/mainnet/whitedoc/proof_of_stake.html/)

## Tools

- [Bi39](https://github.com/bitcoinjs/bip39)
- [bs58check](https://github.com/bitcoinjs/bs58check)
- [Libsodium](https://github.com/jedisct1/libsodium.js)

## References

- [Compile mainnet](https://github.com/tezoscommunity/FAQ/blob/master/Compile_Mainnet.md)
- [tezos running locally](https://medium.com/@mail_35269/how-to-run-a-tezos-node-with-docker-8edb92fb1dd9)
- [Home baking](https://medium.com/@tezbaker.io/tezos-mainnet-setting-up-home-baking-4bf258a9fd30)
