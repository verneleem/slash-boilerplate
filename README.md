# Setup Your Environment

The plan is to turn this into a create-ract-app template. Until that time, we encourage you to fork and clone this repo and follow these steps to get your app running in less than 30 minutes.

From the command line, run `npm install`.

1. Copy the `.env.example` file to a new `.env` file
2. Decide on a Claims Namespace.

- An example of a Namespace is `https://my.app.io/jwt/claims`
- This does not have to be a weblink, but that is the common practice to ensure uniqueness
- If you use a weblink, you do not need to have anything on that link. It is merely used for uniqueness.

3. Copy your Namespce to the `.env` variable for `REACT_APP_SLASH_AUTH_NAMESPACE`
4. Decide on a Header token name.

- This header token by default is `X-My-App-Auth`
- You can use the default or change to your own name.
- We recommend to use something unique and not conflit with [Header Field Definitions](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html) already in use.
- It is common to also use `auth` or `token` here.

5. Copy your Header token name to the `.env` variable for `REACT_APP_SLASH_AUTH_HEADER`
6. Follow the steps below to configure Slash GraphQL and Auth0

## Create a Slash GraphQL Instance - Part 1

1. Create an account with Slash [GraphQL](https://slash.dgraph.io)
2. Launch a new backend
3. Copy the GraphQL Endpoint URL to the `.env` variable for `REACT_APP_SLASH_GRAPHQL_ENDPOINT`

## Configure Auth0

1. Create an account on auth0.com
2. Create a new Application
3. From the Application Settings on Auth0, copy the Domain to `.env` `REACT_APP_AUTH0_DOMAIN`
4. From the Application Settings on Auth0, copy the Client ID to `.env` `REACT_APP_AUTH0_CLIENT_ID`
5. In the Application Settings on Auth0, set the Allowed Callback URLs, Allowed Logout URLs, and the Allowed Web Origins to your domain. For developing locally, this would most likey be `http://localhost:3000/`
6. Run the command `npm run auth0Rule-gen` to replace environment variables in `/deploy/auth0RuleTemplate.js` generating the `auth0Rule.js` file and add to auth0.com as a new rule.
7. Retrieve your Certificate `[Domain].pem` file

- In the Application Setting on Auth0, copy the Domain
- In a web browser of your choice, paste in the domain followed by `/pem`
  For example `dev-12abcdef.us.auth0.com/pem`
- This will download a file named matching your Domain with a `.pem` extension.

8. Move this file to the deploy directory and rename it to `cert.pem`

## Deploy schema to Slash GraphQL

**NOTE**: Running the following command will override the schema on your Slash GraphQL Instance. If you are running this on an existing schema, first, update your schema in `deploy/schema.graphql`. The `Dgraph.Authorization` will be added automatically.

From the command line run the command: `npm run slash-deploy`

This will do the following:

- Login to Slash with the CLI (will open a browser window to confirm code)
- Update the `deploy/schema.graphql` file using the cert.pem and .env variables declared in the previous steps.
- Deploys the updated schema to Slash
- Updated the generated GraphQL types and operation hook files.

## Start the App

From the command line run the command: `npm start`

This will open a new browser tab for your app, allowing you to do the following:

- See a status of connectivity to Slash. E.g. "Successfully connected to Slash GraphQL! Found X user(s)"
- Perform CRUD operations with the Test type. (See `src/TestNodes` for example code)
- Authenticate with Auth0 showing one of the following messages and buttons:
  - "There is currently no Authenticated User" | "Authenticate with Auth0"
  - "A login was successful with the following user data: [json]" | "Logout"
- Quick Link to [Learn Slash](https://dgraph.io/learn)
- Quick Link to [Learn React](https://reactjs.org/)

## Develop your App

We have included the basics here to get you started with your own app development very quickly. We even have included some recommended VS Code extensions that may be helpful to you.

## Noteworthy Tidbits:

- If you delete all operations.graphql file and run the `generate` script, it will result in errors. To resolve this, disable `withHooks` in codegen.yml
- The graphql.vscode-graphql extension is capable of running queries and mutations in the workspace. To do this though, you will need to edit graphql.config.yml to have your actual URL instead of using the environment variable.
- We have included a helper utility `onDeleteUpdateCache` to update the cache when running delete mutations. To see it in action, see src/TestNodes/index.tsx
- If you want to customize your login logic and add claims, read the comments in `auth0RuleTemplate.js`.
- This project is purposefully left mostly unstyled. You may already have your favorite style system or prefer to start from scratch. We recommend using [Semantic UI React](https://react.semantic-ui.com/)
- In the default schema, the `User` type is used for storing and relating authenticated users to other data. The `Test` is used to display the CRUD operation example. The `RestrictedByRole` and `RestrictedByOwner` examplify the two different types of auth rules. If you change the `User` type other than adding more fields, the auth0Rule will no longer work correctly and will need updated.
