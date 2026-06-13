# Screenshots

This folder holds the images referenced from the root `README.md`:

- `command-center-demo.gif` — Factory Command Center, live simulation (animated)
- `dashboard.png` — Executive Dashboard (`/`)
- `command-center.png` — Factory Command Center (`/command-center`)
- `traceability.png` — PCB Traceability (`/traceability`)
- `wip.png` — WIP Monitoring (`/wip`)

## How to capture

1. Start the dev server: `npm run dev`
2. Run the screenshot helper (requires a local Chrome/Chromium install):

   ```bash
   CHROME_PATH="/path/to/chrome" SCREENSHOT_DIR="./docs/screenshots" node scripts/screenshot.mjs
   ```

3. Crop/resize to ~1600x1000 and save as the filenames above (PNG, <500KB each
   recommended for fast README loads).

4. For the demo GIF, record `/command-center` with Playwright's `recordVideo`,
   extract frames with ffmpeg, and re-encode to GIF with a pure-JS encoder
   (e.g. `gifenc` + `pngjs`) since minimal ffmpeg builds often lack a GIF muxer.
