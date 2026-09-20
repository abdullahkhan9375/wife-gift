# Just for you

A small, personal website with five photographs and a letter revealed by opening an envelope. It is a static site, so it can be hosted directly on GitHub Pages.

## Make it yours

1. Add five photographs to `assets/photos/`. JPEG, PNG, and WebP files work. You can use any filenames; update the paths in `content.js` to match.
2. In `content.js`, replace each memory's `title`, `description`, and `alt`. The `alt` field should briefly describe the photograph for someone who cannot see it.
3. Replace the `letter` entries with your own paragraphs. Each quoted entry becomes a separate paragraph. Adjust `opening` and `closing` if you wish. Keep the quotation marks and commas.

The page shows a decorative placeholder when a photograph has not been added. Check all five slides before sharing the link.

## Preview locally

From the repository root, run:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Stop the server with `Ctrl+C`.

## Publish on GitHub Pages

Push this repository to GitHub. In the repository's **Settings → Pages**, choose **Deploy from a branch**, select your publishing branch and the root (`/`) folder, then save. GitHub will show the live URL there. For this project under `abdullahkhan9375/wife-gift`, the expected address is `https://abdullahkhan9375.github.io/wife-gift/`. Your existing `abdullahkhan9375.github.io` repository remains separate.

GitHub Pages serves these files publicly. Remove the site or change the repository settings when you no longer want it online.
