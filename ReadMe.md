# Licensing African Datasets (WordPress)

This repository contains a WordPress site that serves the **“Licensing African Datasets”** front-end via a custom theme.

The WordPress core lives at the repository root, while the application UI is packaged as a bundled front-end under:

- `wp-content/themes/DS-LAW-LAB-LICENSE/`

---

## 1) Repository layout (high level)

### WordPress core (root)

Key WordPress entry points:

- `index.php` – front controller
- `wp-config.php` – database + environment configuration
- `wp-admin/` – admin UI
- `wp-includes/` – WP core libraries

### Custom theme (application)

The custom theme is located at:

- `wp-content/themes/DS-LAW-LAB-LICENSE/`

Important theme files:

- `functions.php` – enqueues theme CSS/JS
- `index.php` – WordPress template that outputs the app mount point
- `index.html` – built HTML entry (includes `#root` and references hashed build artifacts)
- `style.css` – theme header (currently minimal)
- `assets/` – compiled front-end build artifacts (JS/CSS, images, etc.)

---

## 2) How the front-end is served

### Theme mount point

`wp-content/themes/DS-LAW-LAB-LICENSE/index.php` contains the mount element:

- `<div id="root"></div>`

It also calls:

- `wp_head()` and `wp_footer()` for WordPress integration.

### Asset loading

In `wp-content/themes/DS-LAW-LAB-LICENSE/functions.php`, the theme registers/enqueues assets using WordPress hooks:

- Adds a custom CSS enqueue pointing to `assets/index.css`
- Adds a custom JS enqueue pointing to `assets/index.js`

Additionally, `wp-content/themes/DS-LAW-LAB-LICENSE/index.html` references the hashed build artifacts directly, for example:

- `assets/index-B6tpW-rd.js`
- `assets/index-DGPLTSPD.css`

> Note: The repo currently contains both a PHP-driven enqueue approach and an HTML approach that references hashed artifacts. If you change build output filenames, make sure the references in `index.html` and the enqueues in `functions.php` match the emitted files.

---

## 3) Local setup / deployment

### Prerequisites

- PHP >= 7.4 (WordPress requirement)
- MySQL / MariaDB (WordPress requirement)
- Web server configured to run WordPress PHP (Apache/Nginx/IIS—depends on your environment)

### Step-by-step

1. **Copy files to your web root** (or ensure this repository’s `public/` directory is served by your web server).
2. **Create/configure database settings** in `wp-config.php`.
   - This repo includes `wp-config-sample.php`; copy/edit it if needed.
3. **Install WordPress** through `/wp-admin/install.php` (if the site isn’t already installed).
4. **Activate the theme**:
   - WordPress Admin → Appearance → Themes → activate `DS-LAW-LAB-LICENSE`.
5. Visit the site to verify:
   - the `#root` mount point renders
   - the app loads its JS/CSS from `wp-content/themes/DS-LAW-LAB-LICENSE/assets/`

---

## 4) Key files to know

### Root level

- `wp-config.php`
  - Database credentials and WP runtime constants
- `index.php`
  - WordPress front controller

### Theme: `DS-LAW-LAB-LICENSE/`

- `functions.php`
  - Enqueues front-end CSS/JS
- `index.php`
  - Emits `<div id="root"></div>` plus WordPress head/footer
- `index.html`
  - Built application HTML entry with hashed bundle references
- `assets/`
  - Compiled front-end artifacts (JS/CSS/images)

---

## 5) Troubleshooting

### A) Blank page / missing UI

Common causes:

- JS/CSS not found due to filename mismatch
- Theme assets not enqueued as expected

What to check:

- Browser DevTools → Console / Network
- Confirm the JS referenced by the app exists under:
  - `wp-content/themes/DS-LAW-LAB-LICENSE/assets/`

### B) Assets load but the app doesn’t mount

- Confirm `#root` exists in the final HTML
- Confirm the script executes without runtime errors

### C) Hashed build references are outdated

If you rebuild the front-end, hashed filenames often change.

- Update the references in `index.html`
- Update the enqueued filenames in `functions.php` (if you rely on enqueues)

---

## 6) License / attribution

- WordPress core is licensed under the **GPL v2+**. See `license.txt`.
- The bundled front-end assets may include third-party dependencies (the build output is minified). If you need a full dependency/license listing, generate it from the front-end build process/source.

---

## 7) Notes for maintainers

- This codebase mixes:
  - Theme asset enqueuing via PHP (`functions.php`)
  - Direct asset reference via bundled `index.html`
- When updating the front-end build, treat both as integration points and verify they stay consistent.
