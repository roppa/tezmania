# Smart Contracts

We have seen our tezos addresses for users; they begin with 'tz1'. This is an implicit address. For smart contracts they are originated:

- Implicit - tz1
- Origniated - KT1

To see what contracts we have run:

```
./carthagenet.sh client list known contracts
```

## Developing

Tezos smart contracts are writen in a programming language called Michelson. This is a low level stack based language so pretty difficult to grok. A good tool to use is the [Ligo IDE](https://ide.ligolang.org/) for writing contracts. It comes in 3 flavours of language. Once you have compiled it into Michelson you can now deploy it.

The example the documentation has for deploying a contract is:

```
./carthagenet.sh  originate contract <new> transferring <qty> from <src> running <prg> [--fee <amount>]
```

So for the example on the documentation it would look something like:

```
./carthagenet.sh client originate contract increment transferring 0 from bootstrap1 running michelson/increment.ligo.tz --init "1" --burn-cap 0.4
```

And another contract using Docker:

```
./carthagenet.sh client originate contract tezart transferring 0 from tz1ipQzB7tXwafCZn9hJBsJLqrAHWKjK6FNd running "container:contract.txt" --dry-run
```
