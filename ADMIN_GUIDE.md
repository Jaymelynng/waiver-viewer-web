# Admin Guide — Waiver Hub

How to use the admin page to edit waivers, policies, and gym settings.

**Admin URL**: https://waiverhub.mygymtools.com/admin

---

## Logging In

1. Go to the admin URL
2. Enter your PIN
3. You'll stay logged in for 24 hours. After that, just enter the PIN again.

The gear icon in the top-right corner of the main site also links to the admin page.

---

## The Three Tabs

### 1. Release & Waiver
Edit the waiver document that all gyms share. Each section is shown as a card you can edit.

### 2. Policies & Procedures
Edit the policies document. Same card-based editor as the waiver tab.

### 3. Gyms
Manage all 10 gyms — names, abbreviations, fees, domains, emails, logos, and brand colors.

---

## Editing Text

- Click on any text to start editing. You're editing rich text, so **bold**, *italic*, and other formatting is preserved.
- Use the template variables (shown in the colored pills at the top) to insert gym-specific info. For example, type `{{gym.name}}` and it will automatically become the gym's full name when viewed on the main site.

### Available Template Variables

| Type this | It becomes |
|-----------|-----------|
| `{{gym.name}}` | The gym's full name (e.g. "Capital Gymnastics Cedar Park") |
| `{{gym.fee}}` | Annual fee (e.g. "55") |
| `{{gym.domain}}` | Website domain (e.g. "capgymcpk.com") |
| `{{gym.email}}` | Contact email (e.g. "info@capgymcpk.com") |
| `{{gym.abbr}}` | Abbreviation (e.g. "CCP") |
| `{{gym.color}}` | Primary hex color (e.g. "#1f53a3") |
| `{{gym.color2}}` | Secondary hex color (e.g. "#bf0a30") |

---

## Managing Sections

Each document is made up of sections. You can:

- **Add a section**: Click "Add Section" at the bottom. Pick the type (paragraph, heading, bullet list, numbered list, signature block, etc.)
- **Delete a section**: Click the trash icon on any section card
- **Reorder sections**: Use the up/down arrows on each section card

### Section Types

| Type | What It Looks Like |
|------|-------------------|
| Paragraph (p) | Normal body text |
| Heading 1 (h1) | Large section header |
| Heading 2 (h2) | Smaller sub-header |
| Bullet List (ul) | Bulleted list of items |
| Numbered List (ol) | Numbered list of items |
| Indented Block (indent) | Indented quote/legal text |
| Signature Block (sig) | Signature lines with labels |

---

## Managing Gyms

In the **Gyms** tab:

- **Edit gym info**: Click any gym card to expand it. Change the name, abbreviation, fee, domain, email, or logo filename.
- **Change colors**: Each gym has a Primary Color and Secondary Color. You can either click the color swatch to use the visual picker, or type a hex code directly (like `#3e266b`).
  - **Primary color** = header bar, gym selector cards, active tab highlighting
  - **Secondary color** = warning box text/border, policy intro box text/border
- **Add a gym**: Click "Add Gym" at the bottom
- **Remove a gym**: Click "Remove Gym" on the gym's card

---

## Previewing Changes

- Use the **Preview** dropdown (top of the editor) to select any gym
- The preview shows exactly how the document will look on the main site, with all template variables filled in for that gym
- Preview updates live as you edit

---

## Saving Changes

1. Make your edits
2. Click the **Save** button (bottom right)
3. Changes go live on the main site immediately (no deploy needed)

The save button shows a yellow "unsaved changes" indicator when you have edits that haven't been saved yet.

---

## Common Tasks

### Change a word in the waiver
1. Go to the Release & Waiver tab
2. Find the section with the word
3. Click the text and edit it
4. Hit Save

The change applies to all 10 gyms at once.

### Change a gym's annual fee
1. Go to the Gyms tab
2. Click the gym card
3. Change the fee field
4. Hit Save

Anywhere the waiver/policy uses `{{gym.fee}}` will now show the new amount.

### Change a gym's brand colors
1. Go to the Gyms tab
2. Click the gym card
3. Type a hex code in the color text box (e.g. `#3e266b`) or click the color swatch to pick visually
4. Hit Save

### Add a new section to the policies
1. Go to the Policies tab
2. Click "Add Section"
3. Choose the type (paragraph, heading, list, etc.)
4. Type your content
5. Use the arrows to move it to the right position
6. Hit Save

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Changes not showing on main site | Hard refresh the main site (Ctrl+Shift+R). Changes should appear immediately. |
| "Unauthorized" error | Your session expired (24 hours). Refresh the admin page and enter your PIN again. |
| Accidentally deleted a section | Don't hit Save! Refresh the admin page to reload the last saved version. |
| Forgot the PIN | Check with whoever manages the Vercel environment variables, or reset it in Vercel dashboard > Settings > Environment Variables. |
| Editor looks broken | Try a hard refresh (Ctrl+Shift+R). If it persists, try a different browser. |
