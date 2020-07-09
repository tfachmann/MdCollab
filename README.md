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

---

## Contributing

- Commit messages are preferred to follow [conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.4/). ([cheatsheet](https://cheatography.com/albelop/cheat-sheets/conventional-commits/))

## CI
The CI uses [stylelint](https://github.com/stylelint/stylelint) to lint css and html files. Furthermore html files are linted with [htmllint-cli](https://github.com/htmllint/htmllint-cli). Linting javascript files is done with [eslint](https://github.com/eslint/eslint). Furthermore a dependency check for javascript is done with [npm-check](https://github.com/dylang/npm-check) and [webpack](https://github.com/webpack/webpack) tries to build the sourcecode. The rust code is linted with [clippy](https://github.com/rust-lang/rust-clippy). Rust unit tests are done with `cargo test`.

The following sections describes how to install and run this tool, to check local if the ci will pass.

### stylelint

Since stylelint is part of _devDependencies_ in _package.json_ you can install stylelint inside the site directory with `npm install`.

To run stylelint use the following commands:
```sh
# To lint html files
npx stylelint --config ./lint/.stylelintrc.json "**/*.html"

# To lint css files
npx stylelint --config ./lint/.stylelintrc.json "**/*.css"
```

:warning: Note that you have to run these commands inside the _site_ directory as well.

### htmllint

The first step is to install htmllint. You can do that with the following command:

```sh
sudo npm install -g htmllint-cli
```

After that you can run htmllint like this to lint your html files:

```sh
htmllint --rc ./lint/.htmllintrc **/*.html
```

:warning: Note if you do not run this command inside the _site_ directory you have to modify the path which refers to _.htmllintrc_

### eslint

As stylelint eslint is part of the _devDependencies_ in the file _package.json_. That means that you can install it inside the _site_ directory with `npm install`.

To lint your javascript code run the following command:

```sh
npx eslint -c ./lint/.eslintrc.js "**/*.js"
```

:warning: You should run this command inside the _site_ directory to avoid any errors _.eslintrc.js_

### npm-check

Run the following command to install npm check:

```sh
npm install -g npm-check
```

To run dependency checks use the `npm-check` command.

### build javascript

To build java script without starting the server use `npm build` inside the _site_ directory. You have to install the node.js modules before. Use `npm install` inside the _site_ directory for that.

### clippy

First step to use clippy is to install it. You can install clippy using the following commands:

```sh
rustup component add clippy
```

To lint your rust files use:

```sh
cargo clippy --all-targets --all-features -- -D warnings
```

### rust unit test

To be complete, here are the instructions to run rust unit tests:

```sh
cargo test
```
