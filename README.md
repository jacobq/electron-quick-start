# electron-localStorage-limit-test

This example is based on [`electron-quick-start`](https://github.com/electron/electron-quick-start).
To run:

* `git clone https://github.com/jacobq/electron-quick-start.git`
* `cd electron-quick-start`
* `git checkout storageLimit`
* `npm install`
* `npm run start`

It attempts to find the maximum allowed size of a localStorage item by writing long strings.

You should see something like the following appear in the console when it runs.
```
testLocalStorage started
Testing 20.195 MiB, 20679.975 KiB, 21176294 bytes
Testing 20.195 MiB, 20679.977 KiB, 21176296 bytes
Testing 20.195 MiB, 20679.979 KiB, 21176298 bytes
Testing 20.195 MiB, 20679.98 KiB, 21176300 bytes
Testing 20.195 MiB, 20679.982 KiB, 21176302 bytes
Testing 20.195 MiB, 20679.984 KiB, 21176304 bytes
Found unexpected number of bytes: 0 !== 21176304
VM106:75 Got bad result for bytes=21176304 (previously tested size was 21176302 bytes)
VM106:78 testLocalStorage finished
```

You can (hopefully obviously) adjust the values in main.js to alter the test to your liking.

## License

[CC0 1.0 (Public Domain)](LICENSE.md)
