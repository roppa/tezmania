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