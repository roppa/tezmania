# Learning about Tezos

Like any blockchain (IMHO) there is a bit of a learning curve. Same with Tezos as it differs to most blockchains.

## Definitions

baker -
delegates -
cycle -
payment script -
bft - byzantine fault tolerant
opam - OCaml Package Manager

## Running a Tezos network

To get Tezos I found the only way was to use Docker. The installation was riddled with bugs, probably due to an OSX update. Anyway, follow [the 'how to get' instructions](https://tezos.gitlab.io/introduction/howtoget.html).

Once you have downloaded and converted the .sh files to executable, start all processes with (and make sure port 8732 is exposed and cors are set in order to run examples in docker):

```
./babylonnet.sh start --rpc-port 8732 --cors-origin=http://localhost:8000 --cors-origin=node:8732 --cors-origin=localhost:8732
```

Add `--help` for more informations about the script.

Every command to the tezos-client can be equivalently executed using:

```sh
./alphanet.sh client [command]
```

Similary, tezos-admin-client can be executed using:

```sh
./alphanet.sh admin-client [command]
```

With the files above, you can use:

- [bash file] node
- [bash file] client
- [bash file] admin-client
- [bash file] {baker,endorser,accuser}-alpha

For example:

```sh
./alphanet.sh node status
```

or

```sh
./alphanet.sh client man -v 3
```

## Learning resources

- [Tezoscapstone](https://tezoscapstone.com)

## Tools

- [Bi39](https://github.com/bitcoinjs/bip39)
- [bs58check](https://github.com/bitcoinjs/bs58check)
- [Libsodium](https://github.com/jedisct1/libsodium.js)

## References

- [Compile mainnet](https://github.com/tezoscommunity/FAQ/blob/master/Compile_Mainnet.md)
- [tezos running locally](https://medium.com/@mail_35269/how-to-run-a-tezos-node-with-docker-8edb92fb1dd9)
- [Home baking](https://medium.com/@tezbaker.io/tezos-mainnet-setting-up-home-baking-4bf258a9fd30)
