# Repository Guidelines

## Project Structure & Module Organization

This repository is a JavaScript UI library and documentation site. Component source lives in `components/`, with PascalCase folders such as `components/Button/`. Typical component folders contain the implementation (`Button.js`), an `index.js` entry, `styles/` for Less, `demos/` for examples, and `index.md` for docs. Shared browser/vendor libraries are in `libs/`. Documentation pages and site helpers are in `docs/`, while build utilities live in `script/`.

## Build, Test, and Development Commands

- `npm install`: install project dependencies from `package-lock.json`.
- `npm run dev`: run the watcher and local static server in parallel for development.
- `npm run build`: build distributable `nomui.js` and `nomui.css` through Gulp/Rollup.
- `npm start`: serve the repository locally without the watch process.
- `npm run lint`: run JavaScript, Less, and Prettier checks.
- `npm run lint:fix`: auto-fix supported JavaScript and style issues.
- `npm run prettier`: format component JavaScript, Less, Markdown, and JSON files.

## Coding Style & Naming Conventions

Use 2-space indentation, LF line endings, UTF-8, and final newlines as defined in `.editorconfig`. JavaScript follows `@umijs/fabric` ESLint rules with project-specific relaxations in `.eslintrc.js`. Prettier uses single quotes and no semicolons. Name component directories and primary classes in PascalCase (`Grid`, `DatePicker`); keep local files aligned with the component name where practical. Less styles belong under each component's `styles/` directory.

## Testing Guidelines

There is no dedicated test runner configured yet. Before submitting changes, run `npm run lint` and `npm run build`, then verify affected demos with `npm run dev`. When adding tests in the future, colocate them near the component they cover and use names such as `ComponentName.spec.js` or `ComponentName.test.js`.

## Commit & Pull Request Guidelines

Commits are checked with Commitlint and should use Conventional Commit types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `build`, `ci`, `chore`, `perf`, `revert`, or `wip`. Scopes are allowed and commonly use component names, for example `feat(Grid): enhance row dragging`.

Pull requests should describe the user-facing change, list verification commands run, and reference related issues. For UI or documentation changes, include screenshots or a short demo note. Keep PRs focused on one feature or fix.

## Security & Configuration Tips

Do not commit generated dependency folders, local server output, or private configuration. Treat files in `libs/` as vendored assets: update them deliberately and mention the source/version in the PR.
