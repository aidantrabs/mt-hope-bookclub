# mt. hope book club

a community of readers in trinidad & tobago - turning pages, exploring worlds, one book at a time.

founded by dominique & mohith, two UWI medical sciences students who wanted to read more intentionally. all readers welcome.

**live site:** [mt-hope-bookclub.web.app](https://mt-hope-bookclub.web.app)

## stack

- react 19 + typescript (strict) + vite 8
- tailwind css v4
- firebase (firestore, auth, hosting)
- biome for linting and formatting
- github actions for ci/cd

## getting started

```bash
# install dependencies
bun install

# start dev server
bun run dev

# build for production
bun run build
```

## scripts

| command | description |
|---|---|
| `bun run dev` | start vite dev server |
| `bun run build` | typecheck + production build |
| `bun run preview` | preview production build locally |
| `bun run lint` | check lint and format issues |
| `bun run lint:fix` | auto-fix lint and format issues |
| `bun run format` | format source files |
| `bun run typecheck` | typescript type checking |

## environment variables

create a `.env` file in the root:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## project structure

```
src/
  components/
    layout/     # header, footer, page wrapper
    ui/         # reusable ui components
  hooks/        # custom react hooks
  lib/          # firebase config, schemas, api clients
  pages/        # route pages
    admin/      # admin dashboard, book form, login
  utils/        # router config
```

see [docs/architecture.md](docs/architecture.md) for detailed architecture documentation.

## deployment

pushes to `main` trigger the ci/cd pipeline:

1. **ci** - biome lint, typecheck, build
2. **deploy** - builds and deploys to firebase hosting (runs after ci passes)

## license
mit
