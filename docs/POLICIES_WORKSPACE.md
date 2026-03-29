# Policies workspace (full picture)

This file is in the **GitHub repo** so it stays backed up with the app. On your PC, the folder **`JAYME PROJECTS\policies project`** may also contain HTML/markdown helpers **next to** this `waiver-viewer-web` folder — those helpers are not always in Git; keep that parent folder in OneDrive/backup if you rely on them.

---

## What lives where

| Item | Purpose |
|------|--------|
| **This repo (`waiver-viewer-web`)** | **Waiver Hub** — public site, admin, Vercel API, logos. What Vercel deploys. |
| **Sibling files on your PC** (same parent folder as this repo) | MyGymTools how-tos, `QR_Codes.html`, `Policy_Update_Tracker.html`, `manager-emails.html` — offline rollout helpers. |

### Optional

Word/PDF originals and extra logo backups can live in SharePoint or elsewhere. **Live legal text** is edited in **Admin** and stored in **Vercel KV**.

---

## The 10 gyms

| Abbr | Gym name | Domain |
|------|----------|--------|
| CCP | Capital Gymnastics Cedar Park | capgymcpk.com |
| CPF | Capital Gymnastics Pflugerville | capgympfl.com |
| CRR | Capital Gymnastics Round Rock | capgymrnd.com |
| RBA | Rowland Ballard - Atascocita | rbatascocita.com |
| RBK | Rowland Ballard - Kingwood | rbkingwood.com |
| HGA | Houston Gymnastics Academy | houstongymnastics.com |
| EST | Estrella Gymnastics | estrellagym.com |
| OAS | Oasis Gymnastics | oasisgym.com |
| SGT | Scottsdale Gymnastics | scottsdalegymnastics.com |
| TIG | Tigar Gymnastics | tigargym.com |

---

## Quick links

- **Live site:** https://waiverhub.mygymtools.com (or https://waiver-viewer-web.vercel.app)
- **Admin:** https://waiverhub.mygymtools.com/admin
- **GitHub:** https://github.com/Jaymelynng/waiver-viewer-web
- **Vercel:** project **waiver-viewer-web**
- **MyGymTools:** https://mygymtools.com

---

## How it fits together

```
Admin (/admin)  →  Save  →  Vercel KV (content + gyms)
                              ↓
Main site (/)  →  GET /api/content  →  waiver/policy per gym + PDFs
```

Shared text uses placeholders like `{{gym.name}}`. Gym-specific fields come from the **Gyms** tab in Admin.

---

## Docs in this repo

| Doc | Topics |
|-----|--------|
| [README.md](../README.md) | Architecture, APIs, JSON shape, env vars, logos |
| [POLICIES_WORKSPACE.md](POLICIES_WORKSPACE.md) | This page — workspace map, verification steps |
| [ADMIN_GUIDE.md](../ADMIN_GUIDE.md) | Day-to-day Admin |
| [SETUP_GUIDE.md](../SETUP_GUIDE.md) | Vercel + KV + PIN + seed |

MyGymTools setup notes (`HOW_TO_ADD_…`, `MYGYMTOOLS_SIMPLER_…`) live in the **parent** `policies project` folder on your machine; they are not committed to this repo unless you add them later.

---

## After a change — quick check (no coding)

1. Open the **live site**, pick a gym, open Waiver and Policy — they should load.
2. Open **Admin**, sign in with PIN, make a tiny edit (add a space, remove it), **Save**, refresh the main site — change should appear.
3. If something looks wrong, say what you see; rolling back is usually a Vercel **Redeploy** of a previous good deployment.

---

## Removed / archived (history)

Old one-off HTML, star-chart prototype, and Google Sheets tracker were removed from the PC workspace in favor of Waiver Hub. Old app code may still be in **Git history** if it was ever committed.
