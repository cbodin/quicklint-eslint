Quicklint ESLint
======
A CLI wrapping a simple eslint config based on [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base).

The rules/options that differ from airbnb's base:
- [JSON](https://github.com/azeemba/eslint-plugin-json#readme) plugin to lint syntax errors.
- [import/extensions](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md) are set to never include `.js` and `.mjs`, but always require other extensions. 
- [import/no-nodejs-modules](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-nodejs-modules.md) Disallow Node.js built-in modules.


Installation
------
Add the package as a dev dependency:
```bash
npm i -D github:cbodin/quicklint-eslint#v1.0.0
```


Usage
------
The default behavior is to lint all the `.mjs`, `.js` and `.json` files in the `src/` folder.
If any other folders should be used, the search paths can be specified with the `--paths` argument.

To include both the default `src/` folder and a `server/` folder, both paths will need to be supplied:
```bash
quicklint-eslint --paths src/,server/
```

Run `npx quicklint-eslint -h` for a list of all options.

A common scenario is to include a test script in your `package.json` file:
```json
{
  "scripts": {
    "test": "quicklint-eslint"
  }
}
```


Overriding config
------
If some configuration options need to be changed, a `.eslintrc.*` file can be created in the root of the project.
The options set in this file will take precedence over the default supplied config.

Read more at the [eslint documentation](https://eslint.org/docs/user-guide/configuring).
