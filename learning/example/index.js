const net = tezmania.init('http://localhost:8732')

const exampleOperation = {
  "branch": "BMHBtAaUv59LipV1czwZ5iQkxEktPJDE7A9sYXPkPeRzbBasNY8",
  "contents": [{
    "kind": "transaction",
    "source": "tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx",
    "fee": "50000",
    "counter": "3",
    "gas_limit": "200",
    "storage_limit": "0",
    "amount": "100000000",
    "destination": "tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN"
  }]
}

net.postForgeOperations(exampleOperation)
  .then(console.log)
  .catch(console.log)

/*
net.transact({
    source: 'tz1ipQzB7tXwafCZn9hJBsJLqrAHWKjK6FNd',
    destination: 'tz1b6tb9NVP6PuUeVgRdVrz8AurDq6puM5Xe',
    amount: '100'
  })
  .then(console.log)
  .catch(console.log)
*/

/*

console.log('loaded')

const contractAddress = ''
const mnemonic = tezmania.generateMnemonic(160)
console.log('mnemonic: ', mnemonic)

const net = tezmania.init('http://localhost:8732')

tezmania.generateKeysFromMnemonicAndPassphrase({
  mnemonic,
  passphrase: 'password'
}).then(keys => {
  console.log(keys)
  net.getBalance(keys.pkh).then(balance => {
    console.log(balance)
  }).catch(console.log)
})
*/