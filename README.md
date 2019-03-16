# random-walks

This is a javascript library for using different types of random walks. A random walk is a type of behavrior where an agent has a starting location and choses to walk a particular distance away from his current location in a random direction. I use this behavior in some of my work as an interesting type of creating point distributions within some of my generative work.

[**Take it for a test drive!**](https://evelios.github.io/random-walks/example.html)


[![Example Image](example.PNG)](https://evelios.github.io/random-walks/example.html)

## Instilation

```sh
npm install --save https://github.com/Evelios/random-walks.git
```

## Usage

This library works in node.js
```js
var randomWalks = require('random-walks');
```

And in the browser! (It includes the global variable `randomWalks`)
```html
<script type='text/javascript' src='./node_modules/random-walks.js'></script>
```
## Modules

### random distribution

```js
const random = randomWalks.random;
```

### random walk

```js
const randomWalk = randomWalks.randomWalk;
```

### levy flight

```js
const levyFlight = randomWalks.levyFlight;
```
