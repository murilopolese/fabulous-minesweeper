# Fabulous Minesweeper

This is an exercise and a remake of a dear game: [Minesweeper](https://en.wikipedia.org/wiki/Minesweeper_(video_game)).

From [Wikipedia](https://en.wikipedia.org/wiki/Minesweeper_(video_game)):

> Minesweeper is a single-player puzzle video game. The objective of the game is to clear a rectangular board containing hidden "mines" or bombs without detonating any of them, with help from clues about the number of neighboring mines in each field.

## Playing

Start a web server on the root of this repository and navigate to the server address or simply double click the `index.html` file. I have a special appreciation opening html documents from the filesystem.

## Testing

The game makes a clear separation between the library and frontend. The library is tested using [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/) but the interface is not.

Note that some features such as recursively expand "empty" tiles is part of the front end implementation and has no tests.

## Building

The game library (`minesweeper_lib.js`) is written in [CommonJS](https://en.wikipedia.org/wiki/CommonJS) and made available to the browser through [Browserify](http://browserify.org/).

The build step is as simple as `browserify minesweeper_lib.js -o dist.js` or `npm run test`.

If you want `dist.js` to be rebuilt everytime `minesweeper_lib.js` is altered you can run `watchify minesweeper_lib.js -o dist.js` or `npm run watch`.
