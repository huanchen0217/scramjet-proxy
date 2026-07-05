# Scramjet Proxy

A web proxy built on [Scramjet](https://github.com/MercuryWorkshop/scramjet), an interception-based proxy designed to bypass internet censorship.

## How it works

Scramjet uses a service worker to intercept and rewrite web traffic in the browser. A [Wisp](https://github.com/MercuryWorkshop/wisp-js) WebSocket server handles the actual network requests server-side, while the browser rewrites HTML, CSS, and JavaScript on the fly using a WASM-based rewriter.

## Run locally

```bash
npm install
node server.js
```

Open `http://localhost:3030` in your browser.

## Run with Docker

```bash
docker build -t scramjet-proxy .
docker run -p 3030:3030 scramjet-proxy
```

## Deploy

Any Node.js host works. Render, Railway, Fly.io, a VPS, etc.

```bash
# Set PORT env var for your host if needed
PORT=8080 node server.js
```

## Tech

- Scramjet core (service worker + WASM rewriter)
- Wisp protocol (WebSocket transport)
- proxy-bootstrap (auto-downloads and serves scramjet bundles)
- Express (static file serving)

## License

GPL-3.0
