# Blog server
Server for personal blog

## Setup
To get the project running locally:
- Add a .env file with the required environment variables on the root folder. These variables must me provided to you.

- [Download and setup MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/) It is recommended to use the `brew` method.

- Create an authentication user
	```
	use admin
	```

	```
	db.createUser(
		{
			user: "admin",
			pwd: "admin12345",
			roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
		}
	)
	```

- Run MongoDB and add a DB with the name `blog`.
	```
	use blog
	```

- Add a `user` collection
	```
	db.createCollection('user')
	```

- [Install nvm](https://github.com/nvm-sh/nvm) (recommended)

- Install dependencies and run the project:
	```
	nvm use && npm install
	```

## Run
- When all the dependencies are set simply run:
	```
	npm start:development
	```
- The project uses an linter to check for common mistakes while coding (unused imports and variables, missing `;`, extra whitespaces, etc.). It will show the location and the warning on the console. Please fix them before pushing your work.
	- For more info on rules visit: [eslint's rules page](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/docs/rules)

## Naming convention & file structure
- Files:
	- `*unique-name*.subfolder.subfolder.folder.ts` where the `subfolder` and `folder` names must be the singular names of the file's parent folders. For example:
        ```
        .
        └── src
           ├── resolvers
           │  └── mutations
           │     └── user
           │        ├── login.user.mutation.resolver.ts
           │        └── create.user.mutation.resolver.ts
           └── schemas
           .  └── user
           .     ├── mutation.user.schema.ts
           .     └── query.user.schema.ts
        ```

- Folders:
	- These don't have specific names, use as required but they must be meaningful. For example, if you need an `utils` folder to store common values, use: 
        ```
        .
        └── src
           ├── utils
           .  └── values
           .     ├── days.value.util.ts
           .     └── months.value.util.ts
        ```

- Branches:
	- `[Intention]/[card-number]/[short-description]`, for example:
		- Feat/1234356/new-images-handler
		- Chore/1234357/refactor-files

- Commits:
  - `[intention]: [short-description]`, for example:
	  - `update: [short-description]`: For updates being done to the server. Package updates, folder structure changes, etc.
	  - `feat: [short-description]`: New features. New packages, queries, mutations, schemas, etc.
	  - `fix: [short-description]`: Bugfixes. Queries that are failing, wrong responses, wrong updates, etc.
	  - `test: [short-description]`: Test being added to the project or update the to the current ones.
