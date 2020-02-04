const net = tezmania.init('http://localhost:8732')

net.transact({
    source: 'tz1ipQzB7tXwafCZn9hJBsJLqrAHWKjK6FNd',
    destination: 'tz1b6tb9NVP6PuUeVgRdVrz8AurDq6puM5Xe',
    amount: '100'
  })
  .then(console.log)
  .catch(console.log)

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