# Photo prompts and phone shoot list

The site shows a seal panel ("spacer") wherever one of these shots is missing. Each spacer is
tagged in the HTML with its ID, e.g. `data-shot="PHOTO-09"`. To place a finished image, save it
to `src/assets/photos/` and add it to the matching `shoot.<key>` entry in `src/data/photos.ts`.
The spacer is then replaced automatically.

## Owner photo rules (final)

- **Allowed:** building exterior and sign; office; showroom; our own product (Open Line findings,
  pattern stock, stampings), **never customer work**; labeled AI illustrations (badges, lodge,
  medallions); unlabeled AI material close-ups.
- **Shop photos:** only the ones the owner approved one by one from the old-site pull. They're
  listed in the `shop` set in `src/data/photos.ts`. Lean toward people, craftsmanship and
  machine close-ups plus a few big machines; no wide shop-floor views. Get the owner's OK
  before adding any other shop photo.
- **AI images:** materials and metal only. No machines, no people or hands, no logos, no text, no
  recognizable products or designs.

## AI prompts (Midjourney or ChatGPT)

Every prompt shares one style block so the set reads as one shoot. Paste the style block after
each subject line.

**Style block:**

```
photoreal macro product photograph, dark charcoal background, single warm raking light from
the left, deep shadows, shallow depth of field, crisp focus on the nearest edge, natural metal
texture with fine tooling marks, muted brass and steel tones, no people, no hands, no machines,
no logos, no text, no watermark
```

**Settings:**
- **Midjourney:** add `--ar 4:3 --style raw --v 7`.
- **ChatGPT:** ask for a landscape 4:3 image.

Save the output at least 1600px wide.

| ID | Key | Where it shows | Subject line |
|---|---|---|---|
| PHOTO-09 | `struckRelief` | Product Development gallery (**the only spacer left**) | Close-up of a freshly die-struck brass disc showing a simple abstract leaf-and-ring relief pattern, sharp raised edges, light skimming across the relief to show depth |
| PHOTO-10 | `finishedTray` | Products hub header (shows when filled) | A shallow black tray filled with dozens of small identical stamped brass findings (plain jump rings, flat blanks and simple bails), neatly scattered, a few in sharp focus |
| PHOTO-11 | `rawStock` | Leads the Capabilities materials section (optional) | Neat stack of thin raw sheet metal, brass on top, a silver sheet and a copper sheet below, offset so each edge is visible, clean sheared edges |
| PHOTO-12 | `velvet` | Findings and Medallions (shows when filled) | A few small polished stamped pieces, plain round medallion blanks and simple charms, resting on dark navy velvet, soft highlights on the polished faces |
| PHOTO-13 | `milledSurface` | Precision Milling tile (not on a page yet) | Macro of a precision-milled steel surface with crisp pocket edges and a fine swirl milling pattern, a small chamfer catching the light |

**Before an AI image goes on the site, check that it has:**
- No text or lettering, including fake text that AI sometimes draws on labels or medals.
- No machines, hands or people anywhere in the frame.
- Nothing that looks like a real customer's design: no badges, seals, crests or brand marks.
- Metal that looks like real metal: no melted edges, no impossible geometry.

AI material shots are used **unlabeled** because they show metal, not our shop, our people or a
product we claim to have made. Badges, lodge emblems and medallions stay as **labeled** illustrations.

## Phone shoot list (owner)

Shoot in portrait mode (background blurred) on a plain surface, by a window or under warm light.
No machines, shop floor or people at machines in frame. Landscape orientation unless noted.

| ID | Shot | Notes |
|---|---|---|
| PHOTO-15 | **Showroom** | Sample-board wall and display stands. Avoid the window glare. Shoot a few angles. Replaces the current showroom photos on About. |
| PHOTO-16 | **Office** | Desk or front office, tidy, no screens showing customer files. Goes on the About page. |
| PHOTO-03 | **Calipers on a part** | Calipers measuring an Open Line stamping on a bench mat. Hands are fine, faces are not needed. Leads the Capabilities quality section. |
| PHOTO-08 | **Die next to its struck part** | An Open Line die (not a customer's) on a cloth, its struck part beside it. Replaces the die close-up on Product Development and Who Owns the Die. |
| PHOTO-10 | **Tray of Open Line findings** | Same idea as the AI prompt. If you shoot it, skip the AI version. Products hub header. |

## Retired shots

These were dropped under the owner photo rules:

- PHOTO-01: toolmaker at bench
- PHOTO-02: operator at a press
- PHOTO-04: team or owner at the building sign. The building photo itself is back on Home and About.
- PHOTO-05 coil, PHOTO-06 strip, PHOTO-07 die face and PHOTO-14 packaging. Their spots are now
  filled by owner-approved shop photos.
