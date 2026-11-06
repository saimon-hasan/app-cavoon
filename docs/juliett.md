# JULIETT Demo Runbook: Caavon.com

**Team:** Saimon Hasan · Anthony Guerrero · Sean Clary
**Length:** 10 minutes max
**Live site:** https://saimon-hasan.github.io/app-cavoon/
**Repo:** https://github.com/saimon-hasan/app-cavoon

## Before the demo (10 min before)

- [ ] Open the live site and confirm products load (hard refresh: Cmd+Shift+R)
- [ ] Open a **private window** so the bag and favorites start empty
- [ ] Start the mobile app (`cd mobile && npm start`) and have the QR code ready on a second screen or tab
- [ ] Open these tabs, in order:
  1. Live site home page
  2. Issue #4: https://github.com/saimon-hasan/app-cavoon/issues/4
  3. PR #5: https://github.com/saimon-hasan/app-cavoon/pull/5
  4. Mobile architecture: `mobile/docs/architecture.md`
  5. Mobile tests: `mobile/tests/bag.test.ts`
- [ ] Backup ready (see "Backup plan" below)

| Who | Part |
|---|---|
| _name_ | Problem, user, and live website (0:00–4:00) |
| _name_ | Mobile app + audience QR (4:00–5:30) |
| _name_ | Behind the curtain + reality check (5:30–9:00) |

---

## 0:00 · Problem (30 sec)

Perspective clothing customers have no simple place to browse the collection and choose pieces online. Big stores like ASOS and H&M bury small collections under thousands of products.

## 0:30 · User + scenario (30 sec)

**User:** a Perspective customer shopping on a phone or laptop.
**Scenario tonight:** a parent buying a kids hoodie and tee, saving a jacket for later, and coming back to the bag.

## 1:00 · Live website (3 min)

Open the live site.

1. **Home page.** Point out the clean "study in simplicity" design.
2. Click **Kids**. Show the 4 kids products.
3. Open **Kids Cozy Hoodie** ($35). Choose size **4T**, color **Navy**, then **Add to bag**. The bag count becomes 1.
4. Go back and open **Kids Everyday Cotton Tee** ($19). Choose **4T / Cream**, then **Add to bag**.
5. Click the **search** icon and type `denim`. Open **Premium Denim Jacket** and tap **♡ Save**.
6. Open the **bag**. Show both items and the **subtotal of $54.00**.
7. **Refresh the page.** The bag and favorites are still there (saved in the browser).

## 4:00 · Mobile app + audience participation (1.5 min)

> "You can try it too." Show the Expo QR code.

1. Search **Oxford** and open **Classic Oxford Shirt**.
2. Tap **Add to bag** *before* choosing a size. Show the validation message.
3. Choose **Light blue / M**, add it, and raise the quantity to **2**. The subtotal is **$130.00**.
4. Reload the app. The bag is restored.

## 5:30 · Behind the curtain (2 min)

**Thread 1: how a bug became a fix.**
Our web store broke when `products.json` was cut to an invalid fragment.
Issue #4 → branch `feature/fix-web-storefront` → PR #5 into `Dev-test` → release PR #6 into `main`.
Open Issue #4 and PR #5 to show it.

**Thread 2: the mobile bag.**
Product page → choose size/color → provider validates the variant → pure bag update → saved to device storage → bag screen reads shared state → subtotal from catalog prices → restored and re-validated on the next start.
Open `mobile/docs/architecture.md`, then `mobile/tests/bag.test.ts` (5 automated tests).

## 7:30 · Reality check (1 min)

Be honest. These are known gaps:

- **No database yet.** Products come from a JSON file. MongoDB is next.
- **No checkout or real sign-in.** Both screens say "not available yet" on purpose.
- **Production deploy (GCP) is not automated yet.** The live link is GitHub Pages for now.
- Some product photos are placeholders from Unsplash.

## 8:30 · What comes next (30 sec)

1. MongoDB catalog + `/api/products` endpoint
2. Automated deploy: `main` → GitHub Actions → GCP
3. One shared bag between the website and the mobile app
4. Real product photography from Perspective

## 9:00 · Questions (1 min)

---

## Backup plan

| If this fails | Do this |
|---|---|
| Live site won't load | Run locally: `npm install --prefix server && npm start --prefix server`, then open http://localhost:3000 |
| Mobile QR won't connect | Use the browser preview (`npm run web` in `mobile/`) or play the recorded clip |
| No internet | Play the screen recording: _add link here_ |

## Feedback from JULIETT

Fill this in during or right after the demo. Turn every 🐛 and 🔧 into a GitHub Issue.

| Type | Feedback | From | Issue |
|---|---|---|---|
| 👍 keep | | | |
| 🔧 improve | | | |
| 🐛 fix | | | |
| 💡 consider | | | |
| 🗑️ drop | | | |
