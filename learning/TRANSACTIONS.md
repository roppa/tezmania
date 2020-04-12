# Transactions

A transaction is a message sent from one contract to another contract.

```
type transaction = {
  amount: amount; (* amount being sent *)
  parameters: data list; (* parameters passed to the script *)
  (* counter (invoice id) to avoid repeat attacks *)
  counter: int;
  destination: contract hash;
}
```

From the above type, we need to:

- Get header (current block header got from 'bootstrapped'. The node we're connected to (localhost) is 'bootstrapped' if it connected to and synced with enough nodes on the network. If all is ok it returns a timestamp and block header. Useful instead of just getting the current branch (head in our case))
- Get counter: nonce
- Get manager: get the public key (prefixed with 'edpk...') from sender account
- Set fee, gas_limit etc in operation object
- Forge operation object
- Sign operation
- Inject operation - /injection/operation

Once you have an account with tez, you can start transferring. First, lets do a 'dry run' to make sure we don't make any mistakes:

```bash
./carthagenet.sh client transfer 400 from roppa to alice --dry-run
```

You should see something like this:

```
Node is bootstrapped, ready for injecting operations.
Estimated gas: 10207 units (will add 100 for safety)
Estimated storage: no bytes added
Operation: 0x7a8ec45436329aa32a10cd4b77d8a37837553dc499afb5b69d60e5459d18465f6c00fe41a9ad1a1ab40b8ea66a95a32a22809285ce38850ae89015c350008088debe010000a99e5a8acc3b5f5c87aa291afa1c874d0aef3d7400170eb820027d260b016254f21eea0f53278586754ff61817ad254194f284c6d5a2a261e75aa87ae5e304e5bd7eb576f762d7ce5c0dc65f86c8b715e89625e503
Operation hash is 'onvPpf9UEUhtdsPhRA6dhnb6gAfopvUNjhqxXMQghgrbWKgiBTB'
Simulation result:
  Manager signed operations:
    From: tz1ipQzB7tXwafCZn9hJBsJLqrAHWKjK6FNd
    Fee to the baker: ꜩ0.001285
    Expected counter: 346216
    Gas limit: 10307
    Storage limit: 0 bytes
    Balance updates:
      tz1ipQzB7tXwafCZn9hJBsJLqrAHWKjK6FNd ............. -ꜩ0.001285
      fees(tz1Ke2h7sDdakHJQh8WX4Z372du1KChsksyU,130) ... +ꜩ0.001285
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

Lets run this again but log out all the steps invovled using the `-l` flag:

```bash
./carthagenet.sh client -l transfer 400 from roppa to alice --dry-run
```

Now we see much more information:

```
>>>>1: http://node:8732/chains/main/blocks/head/protocols
<<<<1: 200 OK
  { "protocol": "PsBabyM1eUXZseaJdmXFApDSBqj8YBfwELoxZHHW77EMcAbbwAS",
    "next_protocol": "PsBabyM1eUXZseaJdmXFApDSBqj8YBfwELoxZHHW77EMcAbbwAS" }
>>>>2: http://node:8732/chains/main/blocks/head/context/contracts/tz1ipQzB7tXwafCZn9hJBsJLqrAHWKjK6FNd/counter
<<<<2: 200 OK
  "346215"
>>>>3: http://node:8732/chains/main/blocks/head/context/contracts/tz1ipQzB7tXwafCZn9hJBsJLqrAHWKjK6FNd/manager_key
<<<<3: 200 OK
  "edpkuqLhJdGGF4u9qvMqQHgLsA2w4usQTFPYzoasUHpt5kN7sG4ZeT"
>>>>4: http://node:8732/monitor/bootstrapped
<<<<4: 200 OK
  { "block": "BL9HhVo2voFtaKMbvinGfg4TCaAJv1wtSfD4CohCj8kaCU28NJ7",
    "timestamp": "2020-02-06T12:27:52Z" }
Node is bootstrapped, ready for injecting operations.
>>>>5: http://node:8732/chains/main/blocks/head/context/constants
<<<<5: 200 OK
  { "proof_of_work_nonce_size": 8, "nonce_length": 32,
    "max_revelations_per_block": 32, "max_operation_data_length": 16384,
    "max_proposals_per_delegate": 20, "preserved_cycles": 3,
    "blocks_per_cycle": 2048, "blocks_per_commitment": 32,
    "blocks_per_roll_snapshot": 256, "blocks_per_voting_period": 8192,
    "time_between_blocks": [ "30", "40" ], "endorsers_per_block": 32,
    "hard_gas_limit_per_operation": "800000",
    "hard_gas_limit_per_block": "8000000",
    "proof_of_work_threshold": "70368744177663",
    "tokens_per_roll": "8000000000", "michelson_maximum_type_size": 1000,
    "seed_nonce_revelation_tip": "125000", "origination_size": 257,
    "block_security_deposit": "512000000",
    "endorsement_security_deposit": "64000000", "block_reward": "16000000",
    "endorsement_reward": "2000000", "cost_per_byte": "1000",
    "hard_storage_limit_per_operation": "60000",
    "test_chain_duration": "86400", "quorum_min": 3000, "quorum_max": 7000,
    "min_proposal_quorum": 500, "initial_endorsers": 24,
    "delay_per_missing_endorsement": "2" }
>>>>6: http://node:8732/chains/main/blocks/head/hash
<<<<6: 200 OK
  "BL9HhVo2voFtaKMbvinGfg4TCaAJv1wtSfD4CohCj8kaCU28NJ7"
>>>>7: http://node:8732/chains/main/chain_id
<<<<7: 200 OK
  "NetXUdfLh6Gm88t"
>>>>8: http://node:8732/chains/main/chain_id
<<<<8: 200 OK
  "NetXUdfLh6Gm88t"
>>>>9: http://node:8732/chains/main/blocks/head/helpers/scripts/run_operation
  { "operation":
      { "branch": "BL9HhVo2voFtaKMbvinGfg4TCaAJv1wtSfD4CohCj8kaCU28NJ7",
        "contents":
          [ { "kind": "transaction",
              "source": "tz1ipQzB7tXwafCZn9hJBsJLqrAHWKjK6FNd", "fee": "0",
              "counter": "346216", "gas_limit": "800000",
              "storage_limit": "60000", "amount": "400000000",
              "destination": "tz1b6tb9NVP6PuUeVgRdVrz8AurDq6puM5Xe" } ],
        "signature":
          "edsigtXomBKi5CTRf5cjATJWSyaRvhfYNHqSUGrn4SdbYRcGwQrUGjzEfQDTuqHhuA8b2d8NarZjz8TRf65WkpQmo423BtomS8Q" },
    "chain_id": "NetXUdfLh6Gm88t" }
<<<<9: 200 OK
  { "contents":
      [ { "kind": "transaction",
          "source": "tz1ipQzB7tXwafCZn9hJBsJLqrAHWKjK6FNd", "fee": "0",
          "counter": "346216", "gas_limit": "800000",
          "storage_limit": "60000", "amount": "400000000",
          "destination": "tz1b6tb9NVP6PuUeVgRdVrz8AurDq6puM5Xe",
          "metadata":
            { "balance_updates": [],
              "operation_result":
                { "status": "applied",
                  "balance_updates":
                    [ { "kind": "contract",
                        "contract": "tz1ipQzB7tXwafCZn9hJBsJLqrAHWKjK6FNd",
                        "change": "-400000000" },
                      { "kind": "contract",
                        "contract": "tz1b6tb9NVP6PuUeVgRdVrz8AurDq6puM5Xe",
                        "change": "400000000" } ], "consumed_gas": "10207" } } } ] }
Estimated gas: 10207 units (will add 100 for safety)
Estimated storage: no bytes added
>>>>10: http://node:8732/chains/main/blocks/head/hash
<<<<10: 200 OK
  "BL9HhVo2voFtaKMbvinGfg4TCaAJv1wtSfD4CohCj8kaCU28NJ7"
>>>>11: http://node:8732/chains/main/chain_id
<<<<11: 200 OK
  "NetXUdfLh6Gm88t"
>>>>12: http://node:8732/chains/main/blocks/head/helpers/preapply/operations
  [ { "protocol": "PsBabyM1eUXZseaJdmXFApDSBqj8YBfwELoxZHHW77EMcAbbwAS",
      "branch": "BL9HhVo2voFtaKMbvinGfg4TCaAJv1wtSfD4CohCj8kaCU28NJ7",
      "contents":
        [ { "kind": "transaction",
            "source": "tz1ipQzB7tXwafCZn9hJBsJLqrAHWKjK6FNd", "fee": "1285",
            "counter": "346216", "gas_limit": "10307", "storage_limit": "0",
            "amount": "400000000",
            "destination": "tz1b6tb9NVP6PuUeVgRdVrz8AurDq6puM5Xe" } ],
      "signature":
        "edsigtiEjRN816R9wkHiMzQrKixPCGbyPMf7uRDJvK7jd7PDVndsW7a7BNMdwMV4JBQTfumgQrtuGRyLThrto5osY59uMMRhCLt" } ]
<<<<12: 200 OK
  [ { "contents":
        [ { "kind": "transaction",
            "source": "tz1ipQzB7tXwafCZn9hJBsJLqrAHWKjK6FNd", "fee": "1285",
            "counter": "346216", "gas_limit": "10307", "storage_limit": "0",
            "amount": "400000000",
            "destination": "tz1b6tb9NVP6PuUeVgRdVrz8AurDq6puM5Xe",
            "metadata":
              { "balance_updates":
                  [ { "kind": "contract",
                      "contract": "tz1ipQzB7tXwafCZn9hJBsJLqrAHWKjK6FNd",
                      "change": "-1285" },
                    { "kind": "freezer", "category": "fees",
                      "delegate": "tz1Ke2h7sDdakHJQh8WX4Z372du1KChsksyU",
                      "cycle": 130, "change": "1285" } ],
                "operation_result":
                  { "status": "applied",
                    "balance_updates":
                      [ { "kind": "contract",
                          "contract": "tz1ipQzB7tXwafCZn9hJBsJLqrAHWKjK6FNd",
                          "change": "-400000000" },
                        { "kind": "contract",
                          "contract": "tz1b6tb9NVP6PuUeVgRdVrz8AurDq6puM5Xe",
                          "change": "400000000" } ],
                    "consumed_gas": "10207" } } } ],
      "signature":
        "edsigtiEjRN816R9wkHiMzQrKixPCGbyPMf7uRDJvK7jd7PDVndsW7a7BNMdwMV4JBQTfumgQrtuGRyLThrto5osY59uMMRhCLt" } ]
Operation: 0x38c7a00baaa11eb450110f7776b2e2a330a7ed118a594536976d751b03fe4f306c00fe41a9ad1a1ab40b8ea66a95a32a22809285ce38850ae89015c350008088debe010000a99e5a8acc3b5f5c87aa291afa1c874d0aef3d74004fba03cdd58cde8a19da1eaf5a8175b8afba9d1e7367329b6e19fb40ad66114c3592c5b69a5b03df1c0fa7505fc0f57d3164ae2921f570685ab6441b97a6910d
Operation hash is 'oot5saRc8Z9X822Syzh4qfWzkSNKyuMNYWfBx85rm8quMvYihEr'
Simulation result:
  Manager signed operations:
    From: tz1ipQzB7tXwafCZn9hJBsJLqrAHWKjK6FNd
    Fee to the baker: ꜩ0.001285
    Expected counter: 346216
    Gas limit: 10307
    Storage limit: 0 bytes
    Balance updates:
      tz1ipQzB7tXwafCZn9hJBsJLqrAHWKjK6FNd ............. -ꜩ0.001285
      fees(tz1Ke2h7sDdakHJQh8WX4Z372du1KChsksyU,130) ... +ꜩ0.001285
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

We can use these numbered steps later when we build and run the Tezmania library transaction function.

## Creating a transaction using Tezmania

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
