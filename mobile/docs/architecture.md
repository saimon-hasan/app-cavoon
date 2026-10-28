# Mobile architecture and decisions

## Starting point

The supplied download contained website markup/styles, a JSON catalog, and an Express static-file server. This mobile project uses a copy of `public/products.json`. No changes were made to the supplied download or GitHub repository.

## Application structure

- `src/app/`: Expo Router screens. A root stack contains the tab navigator, product details, about, and bag review.
- `src/components/`: shared buttons, photo fallback, empty states, and product cards.
- `src/data/`: original catalog and its typed export.
- `src/state/model.ts`: pure bag operations, validation, and currency calculations.
- `src/state/ShopProvider.tsx`: shared state and asynchronous device persistence.
- `src/theme.ts`: common colors, typography, and spacing.
- `tests/bag.test.ts`: tests covering variants, quantities, invalid persisted data, and totals.

## Decision: React Native with Expo

Need: a shared iPhone and Android app for the existing project. Options: separate Swift/Kotlin apps, a web app, or a shared native framework. The implementation uses Expo and React Native with TypeScript so the team can share UI and business logic while learning mobile development. Tradeoff: native builds and device behavior still require separate verification on both platforms.

Reference: https://docs.expo.dev/get-started/create-a-project/

## Decision: bundled catalog first

Need: make the core shopping workflow runnable without cloud credentials. Options: wait for a hosted API, mock HTTP calls, or bundle the existing catalog. This version bundles the catalog. Tradeoff: prices and product availability are sample data and do not update remotely. Remote Unsplash image URLs were preserved from the supplied data; images can be unavailable or not accurately depict the named item. They must be replaced with approved product assets before a real launch.

## Decision: local persistence

Need: retain a guest's bag and saved products after restart. Alternatives include memory-only state, device storage, and a server-side cart. AsyncStorage preserves non-sensitive shopping data without introducing accounts. Tradeoff: no cross-device synchronization; uninstalling the app or clearing browser storage can erase selections.

Stored data has a version and is validated against the catalog at hydration. Invalid variants, deleted products, and invalid quantities are ignored. Rows with the same product/size/color merge, quantities are capped at 10, and totals use integer cents. Storage reads finish before the interface becomes interactive. Writes are serialized after user changes; a failed load does not immediately overwrite existing device data. Storage failures are shown in a banner.

## End-to-end thread

Product page → choose size/color → add → provider validates variant → pure bag update → serialized AsyncStorage write → bag screen reads shared state → subtotal computed from catalog prices → restored and validated on next startup.

## Next implementation steps

1. Define product and variant identifiers with the Perspective owner.
2. Add an Express product API and MongoDB catalog; keep database credentials on the server.
3. Add explicit loading, error, and refresh behavior for remote data.
4. Decide whether the customer needs guest-only or account-synced bags.
5. Add authoritative server-side price/stock checks before any real checkout.
6. Validate keyboard, safe areas, screen readers, image loading, and persistence on real iPhone and Android devices.

These are future tasks, not completed capabilities. No payments or orders are simulated as successful.
