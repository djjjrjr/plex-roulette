# 🎲 Plex Roulette

A single-file web app that picks a random movie or TV show from your Plex library.

![Static Badge](https://img.shields.io/badge/plex-roulette-E5A00D?style=flat)

## Features

- **Sign in with Plex** — OAuth PIN flow, no manual token hunting required
- **Auto server discovery** — connects to your best available server automatically
- **Library filtering** — choose Movies, TV Shows, or both
- **Per-library tabs** — filter by individual library once connected
- **Watch on Plex** — each result links directly to the item in the Plex web app
- **Persistent sessions** — stays signed in across page reloads
- **No backend required** — single static HTML file

## Usage

### Option 1: Deploy to a static host

Drop `plex-randomizer.html` on any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages — all free). No build step, no configuration. This is the best option for accessing libraries outside your local network.

### Option 2: Launcher scripts

Download all three files and place them in the same folder:

- `plex-randomizer.html`
- `start.command` (Mac/Linux)
- `start.bat` (Windows)

Then double-click the launcher for your OS. It starts a local HTTP server and opens the app automatically. Requires Python 3, which ships with macOS and most Linux distros — install from [python.org](https://python.org) on Windows if needed.

## Why not just open the HTML file directly?

Browsers block cross-origin requests from `file://` URLs, which prevents the app from reaching your Plex server or `plex.tv`. Serving the file over HTTP (even locally) gives it a real origin and resolves this.

## Finding your token (manual login fallback)

If you prefer not to use Sign in with Plex:

1. Open [app.plex.tv](https://app.plex.tv) and sign in
2. Click any item → **···** → **Get Info** → **View XML**
3. Copy the `X-Plex-Token=…` value from the URL bar

## Notes

- **Local servers** work when accessed from the same network
- **Remote servers** work when the app is deployed to an HTTPS domain (due to mixed content restrictions on `localhost`)
- The Watch on Plex button opens the item in the Plex web app in a new tab
