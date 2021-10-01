# ⚙️ Project Configuration

The application has been bootstrapped using `Create React App` for simplicity reasons. It allows us to create applications quickly without dealing with a complex tooling setup such as bundling, transpiling etc.

You should always configure and use the following tools:

#### ESLint

ESLint is a linting tool for JavaScript. By providing specific configuration defined in the`.eslintrc.js` file it prevents developers from making silly mistakes in their code and enforces consistency in the codebase.

[ESLint Configuration Example Code](../.eslintrc.json)

#### Husky

Husky is a tool for executing git hooks. Use Husky to run your code validations before every commit, thus making sure the code is in the best shape possible at any point of time and no faulty commits get into the repo. It can run linting, code formatting and type checking, etc. before it allows pushing the code. You can check how to configure it [here](https://typicode.github.io/husky/#/?id=usage).

#### Absolute imports

Absolute imports should always be configured and used because it makes it easier to move files around and avoid messy import paths such as `../../../Component`. Wherever you move the file, all the imports will remain intact. Here is how to configure it:

For JavaScript projects:

```
// jsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

[Paths Configuration Example Code](../jsconfig.json)

In this project we have to create another tsconfig file `jsconfig.json` where we configure the paths and merge it with the base configuration, because CRA will override it otherwise.

It is also possible to define multiple paths for various folders(such as `@components`, `@hooks`, etc.), but using `@/*` works very well because it is short enough so there is no need to configure multiple paths and it differs from other dependency modules so there is no confusion in what comes from `node_modules` and what is our source folder. That means that anything in the `src` folder can be accessed via `@`, e.g some file that lives in `src/components/MyComponent` can be accessed using `@/components/MyComponents`.
