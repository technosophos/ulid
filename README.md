# ulid: A simple ULID generator CLI

This is a simple command line for generating a [ULID](https://github.com/alizain/ulid).

## Usage

```console
$ ulid
01C0CC2H3YEVR2SSDV1XH5VXVG
```

## Building

`ulid` is written in Go, and uses the Go toolchain.

Prerequisites:

- Go >= 1.8
- Dep
- Make

Building:

```console
$ dep up        # install dependencies
$ make build    # compile into ./bin/ulid
$ make install  # compile into ./bin/ulid, then install into /usr/local/bin/ulid
```
