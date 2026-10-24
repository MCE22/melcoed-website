Drop the official logo images here with exactly these names:

- `mce-plate.png` — primary logo (header plate, footer, About header)
- `mce-seal.png`  — round seal (footer badge, Made in Rhode Island area, favicon source)

They are picked up automatically at build time (see `src/data/brand.ts`) and served through
Astro `<Picture>` as WebP with a PNG fallback. While a file is missing, the generated SVG in
`public/brand/` is used instead. Use transparent PNGs, at least 2× the largest display size
(plate ≥ 600 px wide; seal ≥ 512 px).
