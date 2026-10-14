# Screen collection

Each recreation lives in its own folder under `src/features/`. Keep its screen,
components, and interaction logic together.

The current demo is `pocket-transfer/`. Its Expo Router entry point is
`src/app/pocket-transfer.tsx`; the app home is `src/app/index.tsx`.

To add another recreation:

1. Create a feature folder with its screen and related files.
2. Add a route in `src/app/` that exports the feature screen.
3. Add its title, description, route, and tags to `src/features/demos.ts`.

Only route entry points and navigator layouts belong in `src/app/`.
