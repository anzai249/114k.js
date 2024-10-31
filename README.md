# 114k.js

A a lightweight number abbreviation library.

## Get Started

### Install

Using npm:

```bash
npm i 114k.js
```

Using `<script>`

```html
<script src="format114k.global.js"></script>
```

### Usage

```js
import { abbreviateNumber, formatNumber } from "114k.js"

console.log(abbreviateNumber(114514)); // 114.5k
console.log(formatNumber(114514)); // 114,514

```

or

```js
console.log(format114k.abbreviateNumber(114514)); // 114.5k
console.log(format114k.formatNumber(114514)); // 114,514
```

## APIs

### `formatNumber(num: Number): String`

Get the formatted number like `114,514`

#### Params

##### `num: Number`

The number to be formatted.

### `abbreviateNumber(num: Number, digits?: Number, rounding?: String, locale?: String): String`

#### Params

##### `num: Number`

The number to be abbreviated.

##### `digits?: Number`

Number of decimal places to be retained. **An integer is required.**

Default: `1`

##### `rounding?: String`

Rounding method.

Default: `"round"`

Possible options:

- `"round"`
- `"ceil"`
- `"floor"`

##### `locale?: String`

Language of the abbreviated number.

Default: `"en"`

Possible options:

- `"en"` // k, M, B, T...
- `"ru"` // тыс., млн...
- `"zh-CN"` // 万, 亿, 万亿...
- `"zh-TW"` // 萬, 億, 兆, 京...
- `"ja"` // 万, 億, 兆, 京...
- `"ko"` // 만, 억, 조, 경...
- `"vi"` // vạn, tỷ, nghìn tỷ

Maximum Numbers:

- Maximum `num` of zh-CN, zh-TW, ja and ko is 1e25-1.
- Maximum `num` of en and ru is 1e16-1.
- Maximum `num` of vi is 1e13-1.

## Examples

```js
console.log(
    `The population of India in 2023 was ${formatNumber(1428627663)}, about ${abbreviateNumber(1428627663, 2, "round", "en")} people.`
)
// The population of India in 2023 was 1,428,627,663, about 1.43B people.
```

```js
console.log(
    `台灣共有${abbreviateNumber(36197, 2, "round", "zh-TW")}平方千米的土地。`
)
// 台灣共有3.62萬平方千米的土地。
```

```js
console.log(
    `中国大陆在约${abbreviateNumber(9596961, 2, "round", "zh-CN")}平方千米的土地中塞入了约${abbreviateNumber(1426389855, 2, "round", "zh-CN")}的人口。`
)
// 中国大陆在约959.7万平方千米的土地中塞入了约14.26亿的人口。
```
