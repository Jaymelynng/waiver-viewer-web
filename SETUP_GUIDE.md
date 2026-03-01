# Setup Guide — Waiver Hub

How to deploy this project from scratch or set it up on a new Vercel account. You only need to do this once.

---

## Prerequisites

- A **Vercel** account (free): https://vercel.com
- A **GitHub** account (free): https://github.com
- The code is at: https://github.com/Jaymelynng/waiver-viewer-web

---

## Step 1: Deploy to Vercel

1. Go to https://vercel.com/new
2. Click **Import Git Repository**
3. Select the `waiver-viewer-web` repo
4. Click **Deploy** (accept all defaults)
5. Wait for the build to finish — you'll get a URL like `waiver-viewer-web.vercel.app`

---

## Step 2: Create the KV Database

1. In the Vercel dashboard, go to your **waiver-viewer-web** project
2. Click **Storage** (left sidebar)
3. Click **Create** > **KV (Upstash Redis)**
4. Name it anything (e.g. "waiver-hub-kv")
5. Choose the free tier
6. Click **Create**
7. When asked, link it to your project and select all environments (Production, Preview, Development)

This automatically sets the `KV_REST_API_URL` and `KV_REST_API_TOKEN` environment variables.

---

## Step 3: Set the Admin PIN

1. Pick a PIN (numbers only, 4-6 digits)
2. Generate the SHA-256 hash of your PIN. You can use any of these:
   - **Online**: Go to https://emn178.github.io/online-tools/sha256.html, type your PIN, copy the hash
   - **Terminal**: `echo -n "101484" | shasum -a 256` (replace 101484 with your PIN)
3. In the Vercel dashboard: **Settings** > **Environment Variables**
4. Add a new variable:
   - **Name**: `ADMIN_PASSWORD_HASH`
   - **Value**: The SHA-256 hash you just generated
   - **Environments**: Select all (Production, Preview, Development)
5. Click **Save**
6. **Redeploy** the project (Deployments tab > click the three dots on latest > Redeploy)

---

## Step 4: Seed the Database

The database starts empty. You need to populate it with the default waiver/policy text and gym data.

1. Visit: `https://your-domain.vercel.app/api/seed`
2. You should see a success message with the content and gym data that was created
3. This only needs to be done once. If you ever need to reset to defaults, visit: `https://your-domain.vercel.app/api/seed?force=true`

---

## Step 5: Verify Everything Works

1. **Main site**: Visit your Vercel URL — you should see the gym selector and be able to view waivers/policies
2. **Admin page**: Visit `/admin` — enter your PIN — you should see the editor with all the content
3. **Test a change**: In admin, edit any text, hit Save, then refresh the main site — the change should appear

---

## Step 6 (Optional): Custom Domain

To use a custom domain like `waiverhub.mygymtools.com`:

1. **Vercel**: Go to your project > **Settings** > **Domains** > Add `waiverhub.mygymtools.com`
2. **DNS provider** (e.g. Namecheap): Add a CNAME record:
   - **Host**: `waiverhub`
   - **Value**: `cname.vercel-dns.com`
3. Wait 5-30 minutes for DNS to propagate
4. Vercel will automatically set up HTTPS

---

## Environment Variables Reference

| Variable | Required | How It's Set |
|----------|----------|-------------|
| `KV_REST_API_URL` | Yes | Auto-set when you link KV database (Step 2) |
| `KV_REST_API_TOKEN` | Yes | Auto-set when you link KV database (Step 2) |
| `ADMIN_PASSWORD_HASH` | Yes | Manually added (Step 3) |

---

## Changing the Admin PIN Later

1. Generate the SHA-256 hash of your new PIN
2. Go to Vercel dashboard > **Settings** > **Environment Variables**
3. Edit `ADMIN_PASSWORD_HASH` with the new hash
4. Redeploy the project

---

## Troubleshooting First Deploy

| Problem | Fix |
|---------|-----|
| "KV not configured" error | Make sure you completed Step 2 and the KV database is linked to your project |
| "Admin password not configured" error | Make sure you completed Step 3 and added `ADMIN_PASSWORD_HASH` |
| "Content not found" on main site | Run the seed endpoint (Step 4) |
| PIN doesn't work | Double-check your SHA-256 hash. Make sure you hash just the digits with no spaces or newline |
| Changes don't appear after redeploy | Hard refresh (Ctrl+Shift+R) — the old page may be cached in your browser |
