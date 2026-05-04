## Goal

On the Courses page (`/courses`), add a new section at the very bottom (below the pricing section, near the existing "免费试听" CTA) that shows the appropriate Google Form link(s) based on the currently selected language.

## Links per language

- **Chinese (zh)** — single link
  - https://forms.gle/ADd2njCZUrYT59aH8
- **English (en)** — single link
  - https://forms.gle/YNoL9PDG3oVpzxyF6
- **Japanese (ja)** — single link
  - https://forms.gle/pkQRebRczB4y94oe8
- **French (fr)** — two links
  - Summer time (heure d'été): https://forms.gle/aD5HfDjbwrrqVgkY7
  - Winter time (heure d'hiver): https://forms.gle/HnwJWzQBLfTYFiQd7

## Implementation

### 1. `src/i18n/i18n.tsx`

Extend the `courses` section of the `Dict` type with a new `trialLinks` block:

```ts
trialLinks: {
  eyebrow: string;
  title: string;
  subtitle: string;
  openForm: string;
  links: { label: string; url: string }[];
};
```

Add localized content for each of the four dictionaries (`zh`, `en`, `ja`, `fr`):

- `zh`: title「预约免费试听」, single link labeled "预约表单"
- `en`: title "Book a Free Trial", single link labeled "Open Booking Form"
- `ja`: title「無料体験レッスン予約」, single link labeled「予約フォーム」
- `fr`: title "Réserver un cours d'essai gratuit", two links:
  - "Heure d'été (France)" → summer URL
  - "Heure d'hiver (France)" → winter URL

### 2. `src/pages/Courses.tsx`

Replace the existing single trial button block (the `<Reveal>` containing the `Link to="/booking"` near the bottom) with a new section that:

- Renders a heading using `t.courses.trialLinks.title` and subtitle.
- Maps over `t.courses.trialLinks.links` and renders one Card per link, each with an external `<a target="_blank" rel="noreferrer">` button styled like the existing Booking page entries (sakura button + ExternalLink icon).
- For French this naturally renders two cards side-by-side; for the other languages a single card.

Keep the existing footer untouched. The internal `/booking` button can be removed (since these direct Google Forms replace it on this page) or kept above the new section — recommended: **remove** it so the page ends with the language-specific form links the user requested.

## Files Changed

- `src/i18n/i18n.tsx` — add `trialLinks` to the `courses` dict for all four languages.
- `src/pages/Courses.tsx` — replace bottom CTA with new language-aware trial-links section.

No backend, routing, or build configuration changes needed.
