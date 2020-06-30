# MdCollab

Collaborative editing and previewing of Markdown files

## Backend

Implementation in Rust following [MarkdownComposer](https://github.com/euclio/vim-markdown-composer) which uses [aurelius](https://github.com/euclio/aurelius)

## Building

For compiling the rust code into wasm we use `wasm-pack`:

```sh
cargo install wasm-pack  # only once
wasm-pack build
```

It deploys the WebAssembly code to `pkg/`.

Everything website specific is under `site/`.
To automatically build the site, use `npm`:

```sh
cd site/
npm install  # only once
npm run serve
```

# Contributing

- Commit messages are preferred to follow [conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.4/). ([cheatsheet](https://cheatography.com/albelop/cheat-sheets/conventional-commits/))
