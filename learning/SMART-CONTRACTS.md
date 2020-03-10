# Smart Contracts

We have seen our tezos addresses for users; they begin with 'tz1'. This is an implicit address. For smart contracts they are originated:

- Implicit - tz1
- Origniated - KT1

From the client, list know contracts:

```
./babylonnet.sh client list known contracts
```

Tezos smart contracts are writen in a programming language called Michelson.

```
originate contract increment transferring 0 from bootstrap1 running michelson/increment.ligo.tz --init "1" --burn-cap 0.4
```
