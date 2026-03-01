# Waiver Hub — waiver-viewer-web

Live waiver and policy viewer for 10 gymnastics gyms, with a built-in admin editor.

**Live site**: https://waiverhub.mygymtools.com
**Admin page**: https://waiverhub.mygymtools.com/admin

---

## What This Does

- Displays waivers and policies for any of the 10 gyms
- Automatically swaps in each gym's name, fee, email, colors, and logo
- Users can view on screen or download as PDF (individual or bulk for all gyms)
- Admin page lets you edit all text, manage gyms, and preview changes — no code needed

---

## File Structure

```
waiver-viewer-web/
  index.html          Main site — gym selector, waiver/policy viewer, PDF downloads
  admin.html          Admin editor — login, edit text, manage gyms, preview
  vercel.json         Vercel config (clean URLs)
  package.json        Just one dependency: @vercel/kv
  api/
    content.js        GET/PUT — reads and writes waiver/policy content + gym data
    auth.js           POST — PIN login, returns 24-hour session token
    seed.js           POST/GET — one-time migration to populate the database
  *.png               Gym logo images (500x500)
```

---

## Tech Stack

| Layer | Technology | Cost |
|-------|-----------|------|
| Hosting | Vercel (free tier) | Free |
| Database | Vercel KV / Upstash Redis (free tier) | Free |
| Frontend | Vanilla HTML/CSS/JS (no frameworks) | -- |
| PDF generation | jsPDF + html2canvas (loaded from CDN) | -- |
| Auth | PIN-based with SHA-256 hash + session tokens | -- |

---

## How the Data Flows

```
Admin saves changes
  --> PUT /api/content (with auth token)
    --> Stores to Vercel KV: 'content' key + 'gyms' key

User visits main site
  --> GET /api/content (no auth needed)
    --> Returns content JSON + gyms array
      --> index.html renders with {{gym.name}} etc. replaced per gym
```

---

## API Routes

### `GET /api/content`
Returns the waiver/policy content and gym list. No authentication required.

**Response**: JSON with `waiver`, `policy`, and `gyms` fields.

### `PUT /api/content`
Saves updated content and gym data. Requires auth token.

**Headers**: `Authorization: Bearer <token>`
**Body**: JSON with `waiver`, `policy` fields (required) and `gyms` (optional)

### `POST /api/auth`
Authenticates with a PIN and returns a session token (valid 24 hours).

**Body**: `{ "pin": "123456" }`
**Response**: `{ "token": "abc123..." }`

### `POST /api/seed`  |  `GET /api/seed?force=true`
One-time endpoint to populate the database with default content and gym data. Use `?force=true` to overwrite existing data.

---

## Template Variables

These placeholders work anywhere in the waiver or policy text:

| Variable | Replaced With | Example |
|----------|--------------|---------|
| `{{gym.name}}` | Full gym name | Capital Gymnastics Cedar Park |
| `{{gym.fee}}` | Annual fee amount | 55 |
| `{{gym.domain}}` | Gym website domain | capgymcpk.com |
| `{{gym.email}}` | Gym contact email | info@capgymcpk.com |
| `{{gym.abbr}}` | Short abbreviation | CCP |
| `{{gym.color}}` | Primary brand color (hex) | #1f53a3 |
| `{{gym.color2}}` | Secondary brand color (hex) | #bf0a30 |

---

## Content JSON Structure

The database stores a single JSON object under the `content` key:

```json
{
  "waiver": {
    "title": ["Line 1 of title", "Line 2 of title"],
    "warning": "Warning text shown in the colored box",
    "sections": [
      { "type": "p", "html": "Paragraph with <strong>HTML</strong> and {{gym.name}}" },
      { "type": "indent", "html": "Indented block quote text" },
      { "type": "sig", "lines": [[{ "label": "Name", "flex": 1 }]] }
    ]
  },
  "policy": {
    "title": "POLICIES AND PROCEDURES",
    "intro": "Intro paragraph with {{gym.name}}",
    "sections": [
      { "type": "h1", "text": "Section Header" },
      { "type": "h2", "text": "Subsection Header" },
      { "type": "p", "html": "Paragraph text" },
      { "type": "ul", "items": [{ "html": "Bullet point" }] },
      { "type": "ol", "items": [{ "html": "Numbered item" }] },
      { "type": "sig", "lines": [[{ "label": "Signature", "flex": 2 }]] }
    ]
  }
}
```

Gym data is stored separately under the `gyms` key as an array of objects.

---

## Gym Color System

Each gym has two brand colors:

- **Primary color** (`color`) — Used for the header bar, gym selector cards, and active tab
- **Secondary color** (`color2`) — Used for the warning box border/text and policy intro box

These are set as CSS custom properties (`--gym-color`, `--gym-color2`) when a gym is selected, so the entire page theme updates automatically.

---

## Environment Variables (Vercel)

| Variable | What It Is |
|----------|-----------|
| `KV_REST_API_URL` | Auto-set when you link a KV database in Vercel |
| `KV_REST_API_TOKEN` | Auto-set when you link a KV database in Vercel |
| `ADMIN_PASSWORD_HASH` | SHA-256 hash of the admin PIN |

---

## Logo Files

Logos must be in the root of this folder (same level as index.html) with these exact filenames:

| Gym | Filename |
|-----|----------|
| CCP / CPF | `ccp_cpf logo - 500x500.png` |
| CRR | `CRR-logo - 500x500.png` |
| RBA / RBK | `rba_rbk--logo - 500x500.png` |
| HGA | `hga--logo - 500x500.png` |
| EST | `est--logo - 500x500.png` |
| OAS | `oasis--logo - 500x500.png` |
| SGT | `sgt-logo - 500x500.png` |
| TIG | `tigar--logo - 500x500.png` |

If a logo file is missing, the gym's abbreviation is shown instead.
