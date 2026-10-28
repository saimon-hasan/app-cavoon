# CAAVON Mobile

> A study in simplicity. Discover Perspective clothing, save your favorites, and build your everyday edit.

An Expo / React Native app for iPhone and Android, with a browser preview for convenient development. Version 0.1.0 implements the shopping experience using the 13 sample products provided with the original CAAVON project.

## Try it

On this Mac, double-click **Start CAAVON.command** to start the app. It selects the compatible bundled Node runtime when available. Keep the terminal open and press **w** for a browser preview.

Use Node.js **24 LTS** (also recorded in `.nvmrc`). In this folder:

```sh
npm ci
npm start
```

Keep the terminal running. Open the QR code using an Expo Go version supporting Expo SDK 58, with the computer and phone on the same Wi-Fi network. On iPhone, scan using Camera; on Android, use Expo Go. If the installed Expo Go version does not support SDK 58, use a matching development build. Store accounts are not needed for the browser preview.

Other development commands:

```sh
npm run web       # Browser preview of the shared mobile UI
npm run ios       # Open an installed iOS simulator (requires Xcode)
npm run android   # Open an installed Android emulator
```

No environment variables, backend account, or API keys are needed for this first version. Remote product photos require internet access.

## Included

- Discover screen with collection links and featured pieces
- Catalog search, audience/category filters, and price sorting
- Product details, photo selection, size and color choices
- Favorites saved on the device
- Shopping bag with separate variants, quantity controls, removal, subtotal, and persistence
- Review screen, empty states, unavailable-image fallback, and invalid-route handling
- Screen-reader labels and safe-area-aware layouts

## Stack

React Native + TypeScript → Expo Router → AsyncStorage

The catalog is bundled locally. Bag and favorites persist only on this device/browser; they do not sync between devices. Currency is USD. Quantity is capped at 10 per variant as a prototype rule, not a verified inventory limit.

## Project

[Architecture and decisions](docs/architecture.md) · [Demo walkthrough](docs/demo.md) · [Verification](docs/verification.md)

The next stage is an Express API and MongoDB integration. Accounts, payments, orders, push notifications, deployment, and store submission are not implemented. This prototype is not a completed capstone submission.

## Checks

```sh
npm run typecheck
npm run lint
npm test
npx expo export --platform all
```

Export checks JavaScript bundling for iOS, Android, and web. It does not produce signed store apps or replace physical-device testing.

## Repository layout

Run mobile development commands from this `mobile/` folder. The existing website and Express server remain in their original folders. Dependencies and generated output (`node_modules/`, `.expo/`, and `dist/`) are excluded from Git; `package-lock.json` is committed for reproducible installation.

## Team

Saimon Hasan · Anthony Guerrero · Sean Clary
