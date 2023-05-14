# Moxy.js

Mocks & Proxies

### 1. Install

Run:
```sh
npm i -g @moxy-js/cli
```

### 2. Start

To start simply run:
```sh
moxy
```

It will start the main server on port 3500 with a control panel, and a child server on port 3501 which will serve all the mocks and proxies.

Every request which does not match "/web/..." or "/api/..." will be proxied to the child server.

###2.1. Arguments

```
Options:
      --help               Show help                                   [boolean]
      --version            Show version number                         [boolean]
  -p, --port               Port of the main server, where control panel will be
                           served                       [number] [default: 3500]
  -c, --child-port         Port of the child server, where mocks & proxies will
                           be served                    [number] [default: 3501]
  -d, --debounce           Debounce time in milliseconds for child server
                           restarts                     [number] [default: 5000]
  -s, --skip-open          Skip browser launch        [boolean] [default: false]
  
      --git.remote         Remote url of git repository                 [string]
      --git.private-key    Path to private key or base64 encoded private key
                           (with 'encoded:' prefix)                     [string]
      --git.push-interval  Interval after which changes will be pushed to the
                           remote repository (in minutes) [number] [default: 60]
```