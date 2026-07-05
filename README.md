# Scramjet Proxy

A web proxy built on [Scramjet](https://github.com/MercuryWorkshop/scramjet), an interception-based proxy designed to bypass internet censorship.

## How it works

Scramjet uses a service worker to intercept and rewrite web traffic in the browser. A [Wisp](https://github.com/MercuryWorkshop/wisp-js) WebSocket server handles the actual network requests server-side, while the browser rewrites HTML, CSS, and JavaScript on the fly using a WASM-based rewriter.

## Run locally (Node.js server - full functionality)

```bash
npm install
node server.js
```

Open `http://localhost:3030` in your browser.

This runs the full proxy with a local Wisp WebSocket server. All proxy functionality works.

## Run with Docker (Node.js server - full functionality)

```bash
docker build -t scramjet-proxy .
docker run -p 3030:3030 scramjet-proxy
```

## Deploy to GitHub Pages (static - requires external Wisp server)

The `public/` directory contains a pre-built static version that can be deployed to GitHub Pages or any static host.

**Important:** The static version requires an external Wisp WebSocket server. The proxy will not work without one.

1. **Deploy to GitHub Pages:**
   - Go to repo Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `main`, Folder: `/public`
   - Save

2. **Configure a Wisp server:**
   - Edit `public/config.js` and set `window.WISP_URL` to your Wisp WebSocket server address:
     ```js
     window.WISP_URL = "wss://your-server.com/wisp/";
     ```
   - You can run a Wisp server using [wisp-js](https://github.com/MercuryWorkshop/wisp-js) or deploy the full Node.js server from this repo to a VPS/Render/Railway/Fly.io.

3. **Access your static site:**
   - Visit `https://your-username.github.io/scramjet-proxy/`

### GitHub Actions deployment

The included workflow (`.github/workflows/pages.yml`) automatically deploys the `public/` folder to GitHub Pages on every push to `main`.

## Tech

- Scramjet core (service worker + WASM rewriter)
- Wisp protocol (WebSocket transport)
- proxy-bootstrap (auto-downloads and serves scramjet bundles)
- Express (static file serving for Node.js server)

## License

GPL-3.0