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
[1] Testing total=10588146 bytes = 10 MiB + 99 KiB + 1010 bytes
[2] Testing total=10588147 bytes = 10 MiB + 99 KiB + 1011 bytes
[3] Testing total=10588148 bytes = 10 MiB + 99 KiB + 1012 bytes
[4] Testing total=10588149 bytes = 10 MiB + 99 KiB + 1013 bytes
[5] Testing total=10588150 bytes = 10 MiB + 99 KiB + 1014 bytes
[6] Testing total=10588151 bytes = 10 MiB + 99 KiB + 1015 bytes
[7] Testing total=10588152 bytes = 10 MiB + 99 KiB + 1016 bytes
[8] Testing total=10588153 bytes = 10 MiB + 99 KiB + 1017 bytes
[9] Testing total=10588154 bytes = 10 MiB + 99 KiB + 1018 bytes
[10] Testing total=10588155 bytes = 10 MiB + 99 KiB + 1019 bytes
[11] Testing total=10588156 bytes = 10 MiB + 99 KiB + 1020 bytes
[12] Testing total=10588157 bytes = 10 MiB + 99 KiB + 1021 bytes
[13] Testing total=10588158 bytes = 10 MiB + 99 KiB + 1022 bytes
[14] Testing total=10588159 bytes = 10 MiB + 99 KiB + 1023 bytes
[15] Testing total=10588160 bytes = 10 MiB + 100 KiB + 0 bytes
Found unexpected number of bytes: 0 !== 10588160
Got bad result for bytes=10588160 (previously tested size was 10588159 bytes)
testLocalStorage finished
```

You can (hopefully obviously) adjust the values in main.js to alter the test to your liking.

## License

[CC0 1.0 (Public Domain)](LICENSE.md)
