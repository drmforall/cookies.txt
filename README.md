# cookies.txt

A local cookie exporter by **o11dev**, styled in the black and gold **o11** theme.

Export cookies for the current site or all sites as Netscape cookies.txt, JSON, or a request header string. You can download a file or copy the selected format to the clipboard. The popup also previews cookies for the active site.

Cookie data is read through the browser extension API and handled locally. This extension does not send it to a server.

## Install

### Chrome and Chromium

1. Open `chrome://extensions/` and enable Developer mode.
2. Select **Load unpacked** and choose the `src` directory.

### Firefox

Run `npm ci` and `npm run build:firefox`, then load the Firefox ZIP from `dist` as a temporary add-on or submit it for signing.

## Build and check

```sh
npm ci
npm run check
npm run build
```

The Chrome and Firefox ZIP files are written to `dist`. The custom icon source is `icon-gen/icon.svg`; run `node icon-gen/run.js` from the `icon-gen` directory to regenerate PNGs.

## Permissions

- `activeTab`: identify the active site.
- `cookies` and host access: read cookies for export and preview.
- `downloads`: save exports locally.

Based on [Get cookies.txt LOCALLY](https://github.com/kairi003/Get-cookies.txt-LOCALLY), licensed under MIT. The original copyright notice is retained in [LICENSE](LICENSE).
