export const headHash = 'BMHBtAaUv59LipV1czwZ5iQkxEktPJDE7A9sYXPkPeRzbBasNY8'

// example account from faucet
export const roppa = {
  mnemonic: [
    'exercise',
    'situate',
    'gallery',
    'random',
    'fragile',
    'purpose',
    'elevator',
    'odor',
    'friend',
    'cage',
    'occur',
    'aim',
    'attract',
    'horror',
    'stool'
  ],
  secret: '983142fbeba332140dbb4a8d4d5749c279ae2587',
  amount: '23892354330',
  pkh: 'tz1ipQzB7tXwafCZn9hJBsJLqrAHWKjK6FNd',
  password: 'oBKWAWiGgE',
  email: 'rzqhubtg.lixdjury@tezos.example.org'
}

export const roppaKeystore = {
  mnemonic: roppa.mnemonic.join(' '),
  publicKey: 'edpku2xJnryQwRBr11CQC9FaqZrB6K23KdkzQbu5XEqAtM8vHyVqtr',
  pkh: 'tz1R5ce7MiHEpTfnUTePA5Bv4Mzq1uG13YMU',
  privateKey:
    'edskRkdTqB1GNzBtwnCUA4KX6gfS8oRWCuKdLZmYzgrRgGbwqswtbZeY59q5DxfNZahgV1B6V8eyZ79FpU4687cR9Qve6kXRWc',
  keyType: 'ed25519'
}

export const forgedOperation =
  'ce69c5713dac3537254e7be59759cf59c15abd530d10501ccf9028a5786314cf08000002298c03ed7d454a101eb7022bc95f7e5f41ac78d0860303c8010080c2d72f0000e7670f32038107a59a2b9cfefae36ea21f5aa63c00'

export const transactionParams = {
  from: 'tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx',
  to: 'tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN',
  fee: '50000',
  gasLimit: '200',
  storageLimit: '0',
  amount: '100000000',
  privateKey: roppaKeystore.privateKey
}

export const transactionSource = {
  branch: headHash,
  contents: [
    {
      kind: 'transaction',
      source: 'tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx',
      fee: '50000',
      counter: '3',
      gas_limit: '200',
      storage_limit: '0',
      amount: '100000000',
      destination: 'tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN'
    }
  ]
}

export const operation = {
  branch: 'BKnmAtqQzWG79qD2HGesA32AuwA22qhuKJTGzABLWEZVRhA3B4T',
  contents: [
    {
      kind: 'transaction',
      source: 'tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx',
      fee: '50000',
      counter: '3',
      gas_limit: '400000',
      storage_limit: '60000',
      amount: '100000000',
      destination: 'tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN'
    }
  ]
}
