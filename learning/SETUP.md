# Setting Up and Running a Tezos Network

## Networks

- alphanet
- babylonnet
- mainnet

## Setting up

To get Tezos I found the only way was to use Docker. The installation was riddled with bugs, probably due to an OSX update. Anyway, follow [the 'how to get' instructions](https://tezos.gitlab.io/introduction/howtoget.html).

Once you have downloaded and converted the .sh files to executable, start all processes with (and make sure port 8732 is exposed and cors are set in order to run examples in docker):

```
./babylonnet.sh start --rpc-port 8732 --cors-origin=http://localhost:8000 --cors-origin=node:8732 --cors-origin=localhost:8732
```

Add `--help` for more informations about the script.

Every command to the tezos-client can be equivalently executed using:

```sh
./babylonnet.sh client [command]
```

Similary, tezos-admin-client can be executed using:

```sh
./babylonnet.sh admin-client [command]
```

With the files above, you can use:

- [bash file] node
- [bash file] client
- [bash file] admin-client
- [bash file] {baker,endorser,accuser}-alpha

For example:

```sh
./babylonnet.sh node status
```

or

```sh
./babylonnet.sh client man -v 3
```

## Tezos accounts

Once you have the network running, and it has synced (can take a few days), you can start doing something interesting. First you want an account that has tez, for this we can [use a faucet](https://faucet.tzalpha.net/). Download and save as a json file. Name it whatever you want, then run:

```bash
./babylonnet.sh client activate account yourname with "container:yourname.json"
```

Then to verify run:

```bash
./babylonnet.sh client get balance for yourname
```

For example, the one I use looks like this:

```json
{
  "mnemonic": [
    "exercise",
    "situate",
    "gallery",
    "random",
    "fragile",
    "purpose",
    "elevator",
    "odor",
    "friend",
    "cage",
    "occur",
    "aim",
    "attract",
    "horror",
    "stool"
  ],
  "secret": "983142fbeba332140dbb4a8d4d5749c279ae2587",
  "amount": "23892354330",
  "pkh": "tz1ipQzB7tXwafCZn9hJBsJLqrAHWKjK6FNd",
  "password": "oBKWAWiGgE",
  "email": "rzqhubtg.lixdjury@tezos.example.org"
}
```

You can get more information about your account by running:

```bash
./babylonnet.sh client show address yourname -S
```

In my case we get this:

```bash
Hash: tz1ipQzB7tXwafCZn9hJBsJLqrAHWKjK6FNd
Public Key: edpkuqLhJdGGF4u9qvMqQHgLsA2w4usQTFPYzoasUHpt5kN7sG4ZeT
Secret Key: unencrypted:edsk2phhdQskaFLKSC2qFzSDo1qKwa1xMeH2DXFKywYMRZzrGHHk8y
```

We're communicating directly with a node with these commands, but Tezos has a series of [rpc endpoints](https://tezos.gitlab.io/api/rpc.html#rpc-index) that use JSON.
