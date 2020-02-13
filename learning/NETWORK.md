# Network

To see a list of [RPC commands](https://tezos.gitlab.io/developer/rpc.html) run:

```
./babylonnet.sh client rpc list
```

To get the [JsonSchema](https://json-schema.org/) you can run (for any of the endpoints resulting from the above):

```
./babylonnet.sh client rpc schema get /chains/main/blocks/genesis/hash
```
