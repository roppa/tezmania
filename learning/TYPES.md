# Types - Binary, Hex, Buffer, and Base58

I'd like to make this guide as approachable as possible for as many people as possible, therefore I'd like to cover many aspects that are taken for granted or considered too basic. If you are advanced then skip to the areas more suited to your level.

## Binary

Lets take a random number, between and including 0 and 255. Lets say 72. How does this number get converted into 0s and 1s in binary? Just like decimal, you have a base. You take the your number and divide it by the base (10 in decimal, 2 in binary) in order to get orders of magnitude. For example:

| number | result | remainder |
| ------ | :----: | --------: |
| 72 / 2 |   36   |         0 |
| 36 / 2 |   18   |         0 |
| 18 / 2 |   9    |         0 |
| 9 / 2  |   4    |         1 |
| 4 / 2  |   2    |         0 |
| 2 / 2  |   1    |         0 |
| 1 / 2  |   0    |         1 |

Now, look at the remainder column. Lets flip the column 90 degrees clockwise, we get '1001000'. The rule is, if there are less than 8, you add 0s to the beginning, so we get '01001000'. Lets see this against the orders of magnitude:

| 128 | 64  | 32  | 16  |  8  |  4  |  2  |   1 |
| --- | :-: | :-: | :-: | :-: | :-: | :-: | --: |
| 0   |  1  |  0  |  0  |  1  |  0  |  0  |   0 |

So if we add up the columns with 1s we get: 64 + 8 = 72. The binary representation of 72 is '01001000'.

Try it with the node repl:

```js
;(72).toString(2).padStart(8, '0') // 01001000
```

## Hexadecimal

Binary is not very intuitive for humans. Hexadecimal is one stage up from binary. As the name suggests, it is base 16. Because of this you have 0-9 (10 characters) and a-f (6 characters) = 16 characters. You obtain the hex by splitting a byte into two, two nybles:

| 8   |  4  |  2  |  1  |     |  8  |  4  |  2  |   1 |
| --- | :-: | :-: | :-: | :-: | :-: | :-: | :-: | --: |
| 0   |  1  |  0  |  0  |     |  1  |  0  |  0  |   0 |

So now we have '48', number 4 from the first (nyble) 4 bits, and numer 8 from the second nyble.

```js
;(72).toString(16) // 48
```

## Buffer

Buffers are fixed size memory allocation. It looks like an array `[]` and each element is in binary format (you'll see it as numbers). For example:

```js
const buf = Buffer.from('Buffed!') // <Buffer 42 75 66 66 65 64 21>
```

Lets start with converting a string, `hello`, into binary using `Buffer`:

```js
const hello = Buffer.from('hello', 'ascii') // <Buffer 68 65 6c 6c 6f>
```

We can convert this buffer into hex by:

```js
hello.toString('hex') //'68656c6c6f'
```

To convert back to text we can use:

```js
hello.toString('ascii')
```

## Base58

As we have seen, we can convert text to binary, and vice versa. Sometimes the hexadecimal could seem confusing, for example the difference between '01' and 'Ol'. Satoshi Nakamoto devised a system where characters that could be confused with one another would be removed. This is base58 and is common in the various blockchains.

A good example is on the [Bitcoin Wiki](https://en.bitcoin.it/wiki/Base58Check_encoding).
