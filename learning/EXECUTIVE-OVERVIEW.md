# Executive Overview

Some definitions first:

<dl>
    <dt>Ledger</dt>
    <dd>a book of financial accounts. Comes from Old Dutch meaning a 'large bible'</dd>
    <dt>Distributed</dt>
    <dd>given a share of something to each one of a number of recipients</dd>
    <dt>Consensus</dt>
    <dd>a general agreement</dd>
    <dt>Decentralised</dt>
    <dd>not one source of truth; it is shared; see ‘distributed’</dd>
    <dt>Transaction</dt>
    <dd>an exchange or interaction between people. Any change to the state i.e a seller receives money and the buyer has less money now but has an item of goods. One or a series of steps that all need to be successful for the single transaction to be successful</dd>
    <dt>Integrity</dt>
    <dd>a wholeness; truth. Why truth? When you lie you create a dichotomy - truth and lie - therefore a split in the psyche</dd>
</dl>

What is a Blockchain? A simple definition is 'a distributed ledger'. A ledger is a collection of financial accounts. Distributed means the exact copy exists in multiple places. But what does this mean? How does it work?

Blockchain is a combination of existing and new technolgies:

- Peer-to-peer
- Database and data structures (ledger)
- Cryptography
- Specific blockchain protocol (Bitcoin, Ethereum, et al)

## Peer to peer

A peer to peer network consists of nodes. A node is a computer running specific software on a network, communicating to other nodes.

But isnt't that just a server? The terminology is different because a node is not a stand alone server, it works along side others, so the client server paradigm doesn't quite match.

Not all nodes are the same, some are full nodes (have the full blockchain database), some are light nodes (do not have the full database), a miner has a full node, unless it is mining through a mining pool.

## Ledger

A ledger is simply a record of accounts; a running record of transactions. These records are stored in a database.

## Transactions

What gets stored in the ledger? Transactions. I want to pay Bob 157 Tez. I need to have my address/account, Bob's address/account, how much I want to pay, plus my signature (traditionally a signature, with blockchain it is a digital signature).

## Cryptographic hash

A hash algorithm takes in content and returns a fixed length string.

1. The resultant hash should be a fixed length
2. It should be impossible to reverse
3. It should be fast to verify
4. A tiny change results in a vastly different hash
5. Two different inputs should not result with the same hash

The five items above comprise the attributes of a hashing function.

## Transactions, addresses and signatures

In order to make transactions you need an address. In traditional terms, an address for another to send you funds would be a bank account number. An address is really a public key. A public key has a counterpart; a private key. The private key is the proof of ownership of the address - if you have the private key you own everything.

```
[my address] => [recipient address] [amount] [fee] [signature]
```

What prevents a fraudulent transaction? That is what the signature is for.

- Hash the `[my address] => [recipient address] [amount] [fee]`
- Take that hash, and encrypt it with your private key, creating a signature

Your signature can only be decrypted using your public key. This is how a transaction can be verified in order for it to be included in the block.

Digital Signatures are an important part, not just for the authentication of a transaction, but it could be used in an actual contract. Imagine you have a document to sign, an actual document, a PDF for example. This document could be hashed, then encrypted with your private key, to get . another takes the same document, hashes it, then decripts your signed document, checks the hash, if the hashes matches, then you really did 'sign' it by using your private key (only you could have done that).

A transaction gets submitted to the network and is collected into a transaction pool.

You can generate a public/private key with `openssl`:

```
openssl ecparam -name secp256k1 -genkey -noout | openssl ec -text -noout
```

Which generates this:

```
read EC key
Private-Key: (256 bit)
priv:
    04:d9:b6:10:bd:4e:4f:b1:b4:4e:37:ef:01:fd:20:
    ce:fc:98:4a:6d:cc:75:e2:80:5d:97:a5:dc:e3:9b:
    21:fc
pub:
    04:c0:d2:b4:eb:8b:bd:ac:d1:e0:b8:be:61:c0:30:
    de:70:31:f9:f2:0b:3c:02:c7:25:2b:7f:a2:f9:2c:
    5f:06:d7:6f:e4:84:6e:eb:e1:75:7e:b8:83:35:e0:
    6a:95:cc:58:dc:22:d1:c9:97:4d:24:7c:b3:51:e1:
    41:19:ff:b3:3d
ASN1 OID: secp256k1
```

## Blocks

A block consists of:

- A list transactions (included at the miners discretion)
- A reference to the previous block hash, a nonce (for proof of work)

The first transaction in the list is called a coinbase, and consists of the miners address, any coin rewards plus the total mining fees from the transactions. The hash of all this information will become the link to the next block.

All chains start somewhere. With Blockchain it is the Genesis block. Geneis means 'the origin or mode of formation of something'.

## Mining

Block creation is regulated by the network, one block every 10 minutes, and is achieved by using a mining difficulty. A SHA (Secure HAsh) algorithm is used. The attributes of a SHA algorithm are:

<dl>
    <dt>Deterministic</dt>
    <dd>any input always produces the same output</dd>
    <dt>Verifiable</dt>
    <dd>computing the hash of an input is efficient, O(1)</dd>
    <dt>Uncorrelated</dt>
    <dd>a tiny change in the input produces a vastly different hash</dd>
    <dt>Irreversible</dt>
    <dd>the original input cannot be recreated from the hash</dd>
    <dt>Collision protection</dt>
    <dd>should not be able to generate the same hash from two different inputs</dd>
</dl>

A way to do this is to use a SHA hash, and state that the beginning of the hash must begin with an agreed (by the network) number of zeros. In our case we will go for one zero.

Create a text file, `0.txt` for example and add this:

```
mark -> bob 1000 1
bob -> alice 40 1

8
0

```

Lets check this block with:

```
shasum -a 256 0.txt
```

And we get:

```
0b49856216b097e83eb8c9459638fbfa1ce02df7b6938b6903f4411aaa1bc72d  0.txt
```

In our example protocol, lets assume the last line with text is the hash of the previous block (in this case it is a genesis block, so previous would be 0). Then, the line before that would be the nonce. The first hash would use 0 for the nonce. We would hash, if the hash begins with a zero, then we have mined a block. If not we need to increment the nonce, perform a hash, and rinse and repeat.

This is proof of work.
