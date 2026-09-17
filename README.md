# Homegrown Storefront

Static storefront concept for **Homegrown**, built to be dropped directly into GitHub Pages.

## Files
- `index.html` — storefront markup
- `styles.css` — complete responsive styling
- `script.js` — demo cart, newsletter interaction, reveal animations
- `assets/` — selected Homegrown concept boards extracted from the supplied PDF

## Run locally
Open `index.html` in a browser, or use a small local server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish with GitHub Pages
1. Create a new GitHub repository.
2. Upload all files in this folder, preserving the `assets/` directory.
3. Commit to the `main` branch.
4. In GitHub, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select `main` and `/ (root)`, then save.

GitHub will provide a `github.io` URL. You can later connect a custom domain so customers never need to see the GitHub address.

## Before taking real orders
This version has a front-end-only cart. For actual checkout, inventory, taxes, shipping, email capture, and order management, connect it to something like Shopify or Stripe.

## Easy edits
Search the HTML for:
- `$38`, `$42` to change prices
- `Drop 001` to rename the collection
- `hello@homegrown.example` to replace the contact email
- `Instagram` / `TikTok` to add real links

The Google Fonts links in `index.html` require internet access. If you remove them, the site falls back to standard fonts.


## Interactive 360-style product spin
The first product, **The Original**, now includes an 8-frame drag-to-rotate viewer. The frames live in:

`assets/spin/the-original/`

The filenames must stay `frame-01.webp` through `frame-08.webp`. The viewer logic is at the bottom of `script.js`.
