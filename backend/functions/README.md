## Getting Started

### Setup

    npm install
    npm install -g firebase-tools
    firebase login

## Run locally & watch for code changes

To automatically rebuild after each save:

    npm run build:watch

To run locally

    npm run emulators

### Deploy

    npm run deploy

### Deploy specific functions

    firebase deploy --only functions:myFunction

### Run Tests

    npm run test

## Improvements

### Making the Swagger UI work on the hosted cloud function

The `tsoa.json` spec/basePath is only valid in dev (running on the local emulators). Therefore, the swagger ui is not functionnal on the hosted cloud function.

In order to make it work, we should have the spec/basePath set to "api", but that would break it in dev.

Ideally, we should:

1. Have a `tsoa.dev.json` and a `tsoa.prod.json` in a config folder
2. Keep a copy of the `config/tsoa.dev.json` as `tsoa.json` during development
3. Swap the root `tsoa.json` for the `config/tsoa.prod.json` file (renammed as `tsoa.json`) before a deploy
4. Deploy the function
5. Swap back the `config/tsoa.dev.json` as `tsoa.json` to continue local development

I think it probably will be necessary in order to leverage an api client generator... We'll see soon enough!
