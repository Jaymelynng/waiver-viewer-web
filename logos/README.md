# Gym logos (500×500 PNG)

Put each gym’s logo file **in this folder**. Names must match what you enter in **Admin → Gyms → Logo** (usually just the filename, e.g. `hga--logo - 500x500.png`).

The live site loads them from **`/logos/<filename>`**. You can use a bare filename in Admin or the full path `logos/...`.

After adding or renaming files, commit and deploy so Vercel serves them.

**Expected filenames** (defaults):

| Gym | File |
|-----|------|
| CCP / CPF | `ccp_cpf logo - 500x500.png` |
| CRR | `CRR-logo - 500x500.png` |
| RBA / RBK | `rba_rbk--logo - 500x500.png` |
| HGA | `hga--logo - 500x500.png` |
| EST | `est--logo - 500x500.png` |
| OAS | `oasis--logo - 500x500.png` |
| SGT | `sgt-logo - 500x500.png` |
| TIG | `tigar--logo - 500x500.png` |

If you still have PNGs in the **project root** from an old setup, **move them into this `logos/` folder** and redeploy.
