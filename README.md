# Folder Structure

```markdown
├── public
│   ├── images                   -> Static assets
│   ├── locales                  -> Translations
│   └── other files
├── src
│   ├── @core                    -> Template's core files
│   ├── @fake-db                 -> Fake Database for mocking axios requests (Fake API Calls)
│   ├── configs                  -> Configuration files
│   │   ├── acl.ts               -> Your Access Control file/configurations
│   │   ├── auth.ts              -> Your authentication file/configurations
│   │   ├── i18n.ts              -> i18n configurations and initialization
│   │   └── themeConfig.ts       -> Template configurations
│   ├── context                  -> Your context files go here
│   ├── hooks                    -> Your hooks go here
│   ├── layouts                  -> Your layouts
│   │   ├── components           -> Your components, layout components
│   │   ├── UserLayout.tsx       -> File responsible to render layout & template
│   │   └── UserThemeOptions.ts  -> Your theming file to override core theming
│   ├── navigation               -> Vertical & Horizontal static navigation menu files
│   │   ├── horizontal
│   │   └── vertical
│   ├── pages                    -> View files that render all the pages
│   │   ├── _app.tsx             -> Main file responsible to render layout
│   │   ├── _document.tsx        -> HTML document & emotions configurations
│   │   └── index.tsx            -> Application entry file
│   ├── store                    -> Redux store
│   ├── types                    -> All types (only in the typescript version)
│   └── views                    -> View files that are included in pages folder
├── styles                       -> Global styling
├── .env                         -> Environment file
├── .eslintrc.json               -> ESLint configurations (Linting code)
├── .gitignore                   -> gitignore (ignore files and folder to sync with repo)
├── .npmrc                       -> Node configuration file
├── .nvmrc                       -> nvm configuration file
├── .prettierrc.js               -> Prettier configurations (editor code formatting)
├── next.config.js               -> Next js configurations
├── next.d.ts                    -> Next js global types configurations
├── package.json                 -> All the dependencies require to run the template
├── tsconfig.json               -> TypeScript configurations
```
