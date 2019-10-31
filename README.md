# electron-localStorage-limit-test

This example is based on [`electron-quick-start`](https://github.com/electron/electron-quick-start).
To run:

* `git clone https://github.com/jacobq/electron-quick-start.git`
* `cd electron-quick-start`
* `git checkout storageLimit`
* `npm install`
* `npm run start`

It attempts to find the maximum allowed size of a localStorage item by writing long strings.
(It does not search efficiently, e.g. use bisection; it just steps linearly.)

You can expect to see something like the following appear in the console when it runs.
```
testLocalStorage started
Testing 10.098 MiB, 10339.986 KiB, 10588146 bytes
Testing 10.098 MiB, 10339.987 KiB, 10588147 bytes
Testing 10.098 MiB, 10339.988 KiB, 10588148 bytes
Testing 10.098 MiB, 10339.989 KiB, 10588149 bytes
Testing 10.098 MiB, 10339.99 KiB, 10588150 bytes
Testing 10.098 MiB, 10339.991 KiB, 10588151 bytes
Testing 10.098 MiB, 10339.992 KiB, 10588152 bytes
Testing 10.098 MiB, 10339.993 KiB, 10588153 bytes
Found unexpected number of bytes: 0 !== 10588153
Got bad result for bytes=10588153 (previously tested size was 10588152 bytes)
testLocalStorage finished
```

You can (hopefully obviously) adjust the values in main.js to alter the test to your liking.

## License

[CC0 1.0 (Public Domain)](LICENSE.md)
