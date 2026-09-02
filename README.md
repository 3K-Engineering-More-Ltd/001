# My App

A minimal static web app with a settings page and a dark-mode toggle.

## Features

- **Dark mode toggle** on the settings page (`settings.html`), implemented as an
  accessible switch (`role="switch"`, keyboard operable).
- The chosen theme is persisted in `localStorage` and applied before first
  paint, so there is no flash of the wrong theme on page load.
- Until the user makes an explicit choice, the app follows the operating
  system's `prefers-color-scheme` setting — including live changes.

## Running

No build step or dependencies required. Serve the directory with any static
file server, for example:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser.

## Structure

| Path            | Purpose                                        |
| --------------- | ---------------------------------------------- |
| `index.html`    | Home page                                      |
| `settings.html` | Settings page with the dark-mode toggle        |
| `css/styles.css`| Shared styles; themes via CSS custom properties|
| `js/theme.js`   | Theme resolution, persistence, and toggling    |
