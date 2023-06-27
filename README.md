# Deliveroo

This is a demo project of Deliveroo app.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `server`: a ExpressJS app
- `web`: a ReactJS app

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Setup

Run the following command:

```sh
pnpm install
// This will install all dependencies for all apps and packages
```

## Environment Variable Setup

To run this project successfully, you need to set up the following environment variables. These variables contain sensitive information such as secret keys and database credentials, so ensure that you keep them confidential.

### Server

1. Create an `.env` file in the root directory of the project. (Use .env.example as a template)

2. Copy and paste the following environment variables into the `.env` file:

```env
# server/.env
ACCESS_TOKEN_SECRET=<ACCESS_TOKEN_SECRET>
REFRESH_TOKEN_SECRET=<REFRESH_TOKEN_SECRET>
CLIENT_URL=http://localhost:3000
GOOGLE_CLIENT_ID=<GOOGLE_CLIENT_ID>
GOOGLE_CLIENT_SECRET=<GOOGLE_CLIENT_SECRET>
DATABASE_NAME=<DATABASE_NAME>
DATABASE_USERNAME=<DATABASE_USERNAME>
DATABASE_PASSWORD=<DATABASE_PASSWORD>
```

```env
# web/.env
VITE_GOOGLE_OAUTH_REDIRECT_URL=http://localhost:4000/auth/google
VITE_GOOGLE_CLIENT_ID=<YOUR GOOGLE CLIENT ID GOES HERE>
```

3. Replace the `<...>` placeholder values with the actual values specific to your setup. For example, `<ACCESS_TOKEN_SECRET>` should be replaced with a secret key for your access tokens, `<GOOGLE_CLIENT_ID>` and `<GOOGLE_CLIENT_SECRET>` should be replaced with the corresponding values from your Google API credentials, and so on.

4. Save the `.env` file.

**Note:** Make sure not to commit and push the `.env` file to the repository, as it contains sensitive information. The file is already added to the `.gitignore` to prevent accidental commits.

If you encounter any issues or have any questions, please don't hesitate to reach out for assistance.

### Build

To build all apps and packages, run the following command:

```
// In the root directory
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
// In the root directory
pnpm dev
// This will start both the server and the web app
```
