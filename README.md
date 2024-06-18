# Stuhub IO

### Quick Start

```bash
git clone git@github.com:Stuhub-io/stuhub-web.git

cd stuhub-web
bun install
bun dev
```

## Deployment
### Web

| Environment | URL |
| --- | --- |
| Development | https://stuhub-web-dev.vercel.app/
| Alpha | --- |
| Staging | ... 

### Core Api

| Environment | URL |
| --- | --- |
| Development | ... |
| Alpha | ... |
| Staging | ... 

## Repos
| Repo | URL | 
| --- | --- |
| Be core | https://github.com/Stuhub-io/stuhub-core | 
| Web | https://github.com/Stuhub-io/stuhub-web |

## Resources

| Name | Description | URL
| --- | --- | --- |
| Design | mockup for UI | setting up Visibly .... |
| Doc | Business Docs | setting up Lark |
| Files | 3rd party keys | ... |

## Technique Document
**Source Code**

- `src`
  - `app`: pages, layouts entrance components, handle routing *(follow [NextJs documentsh](ttps://nextjs.org/docs))*.
  - `components`: contains reusable UI Components.
    - `common`: contains most use components across the app.
      - `Button`: Example component
        - `Button.tsx`: Contains Button components
        - `utils.tsx`: Utils that bound to the button only
        - `index.ts`: export all the exported utils, components in the folder.
    - `...`: sub folders for contain relate components of same domain (ex: auth, noti, chat, ...)
    - 
  - `constants`: Contain app's constant files, (`routes.ts`, `envs.ts`, `enum.ts`)
  - `context`: Contain app level contexts (`auth`, `noti`, `socket`, ...)
  - `hooks`: Contain reusable Hooks for app, grouped by domains.
      - `projects`: Example for project domain's hooks.
        - `useFetchProjects.ts`: React query Hook for fetching user's Projects
        - `...`
  - `libs`: Third - parties related files for utils, setup(Ex: `firebase.ts`, `knock.ts`).

**Convention**

When signing new commit, the message should follow these rules
- The message must include one of these headers: `feat`, `fix`, `release`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `revert`, `ci`, `build`.

- Include the context of the changes:,`ui`,`auth`,`profile`,`landing`,`workspace`,`noti`,`all`,
,`common`.
- Message length should be under 75 characters.

**Example**: `feat(auth): integreate api for login page`