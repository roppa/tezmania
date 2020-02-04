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

## Creating a transaction

Following [this example of how to transfer from one account to another](http://www.ocamlpro.com/2018/11/15/an-introduction-to-tezos-rpcs-a-basic-wallet/) we can use tezmania to do the transfer.

1. get counter from sender: /contracts/[address]/counter
2. get key (address and key) from sender: contracts/[address]/manager_key
   - if null, create **revelation operation**
   - else, should return the address (same as sender) and ‘key’
3. get bootstrapped - if bootstrapped it returns the current block and timestamp
4. get constants - returns constants object
5. get head hash (redundant as same data from bootstrapped?)
6. get chain_id
7. forge operation into binary
8. sign binary operation

```bash
Node is bootstrapped, ready for injecting operations.
Estimated gas: 10207 units (will add 100 for safety)
Estimated storage: no bytes added
Operation: 0x92696aa6609d8cd44143665311899d8cc1c9ba9ee3cdca8658e67cf71d731c086b00fe41a9ad1a1ab40b8ea66a95a32a22809285ce38eb09e69015904e00009cf0029c8830616c2e7c576d3b061aba27a2d8659f2cf215711507155827883b6c00fe41a9ad1a1ab40b8ea66a95a32a22809285ce38a509e79015c350008088debe010000a99e5a8acc3b5f5c87aa291afa1c874d0aef3d7400b9ac299d771cfa32a5b4e40474ad3a87f49691afddc9c805e88ef613df726511082f0649c3802815c7dcfc8ab55feda99ffee7dd516b0428add1adbac471d70c
Operation hash is 'onemytKzTJF23mMQQukTdNcCPVLgYpWL4uq3n8Mrsqwn6pL1Lqe'
Simulation result:
  Manager signed operations:
    From: tz1ipQzB7tXwafCZn9hJBsJLqrAHWKjK6FNd
    Fee to the baker: ꜩ0.001259
    Expected counter: 346214
    Gas limit: 10000
    Storage limit: 0 bytes
    Balance updates:
      tz1ipQzB7tXwafCZn9hJBsJLqrAHWKjK6FNd ............. -ꜩ0.001259
      fees(tz1Ke2h7sDdakHJQh8WX4Z372du1KChsksyU,126) ... +ꜩ0.001259
    Revelation of manager public key:
      Contract: tz1ipQzB7tXwafCZn9hJBsJLqrAHWKjK6FNd
      Key: edpkuqLhJdGGF4u9qvMqQHgLsA2w4usQTFPYzoasUHpt5kN7sG4ZeT
      This revelation was successfully applied
      Consumed gas: 10000
  Manager signed operations:
    From: tz1ipQzB7tXwafCZn9hJBsJLqrAHWKjK6FNd
    Fee to the baker: ꜩ0.001189
    Expected counter: 346215
    Gas limit: 10307
    Storage limit: 0 bytes
    Balance updates:
      tz1ipQzB7tXwafCZn9hJBsJLqrAHWKjK6FNd ............. -ꜩ0.001189
      fees(tz1Ke2h7sDdakHJQh8WX4Z372du1KChsksyU,126) ... +ꜩ0.001189
    Transaction:
      Amount: ꜩ400
      From: tz1ipQzB7tXwafCZn9hJBsJLqrAHWKjK6FNd
      To: tz1b6tb9NVP6PuUeVgRdVrz8AurDq6puM5Xe
      This transaction was successfully applied
      Consumed gas: 10207
      Balance updates:
        tz1ipQzB7tXwafCZn9hJBsJLqrAHWKjK6FNd ... -ꜩ400
        tz1b6tb9NVP6PuUeVgRdVrz8AurDq6puM5Xe ... +ꜩ400
```

```bash
tezos-client wait for ooxQH3YvHAt1D4yTMYGteLKd4DyV4THnepSjjofoMY56Uhg4KQa to be included --confirmations 30 --branch BL7jEnD2f775Ao92P5nNfRboKaaQR3Hn8anounN1yynPwcvUrvt
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
