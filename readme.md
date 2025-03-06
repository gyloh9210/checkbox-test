# How to setup
## 1. docker-postgres
1. go to `docker-progress` folder
1. run `docker compose up` to boot the postgres container
1. create a database, called `checkbox`

## 2. express-backend
1. go to `express-backend` folder
1. run `npm install` to install dependencies
1. run `npm run migrate` to start the schema initialization
1. run `npm run seed` to seed test data
1. run `npn run dev` to start the server

If you encountered db connection issues:
1. Make sure you have already created a database in postgress and named it `checkbox`
2. Make sure db credentials between `docker-postgres/docker-compose.yml` and `express-backend/.env` are matched

#### Folder structure
- controllers - determine what response to send back, validate payload and control data transmission to a model
- migrations - contain table schema
- model - usually contain business logic, but in this case, it just plainly read/write data to a table
- seeds - contain seeders

## 3. task-dashboard
1. go to `task-dashboard` folder
1. run `npm install` to install dependencies
1. run `npm run start`to start

If you encountered backend connection issues:
1. Please verify you are defining the correct API HOST in `task-dashboard/.env`

Some libraries covered:
- built with react
- use primereact as it offers feature-rich UI components
- use primeflex as it is a CSS utility library and support very well to primereact
- use tanstack query for async state management. It offers local caching too which greatly improve the app performance

#### Folder structure
- api - send CRUD requests to the backend and manage cache key
- components - granular UI components for self contain logic
- context/providers - mainly for Toast so it can be used anywhere throughout the app
- types - type definition

### Improvements
- add a confirmation dialog when deleting a task
- embed a WYSIWYG editor for task description for rich formatting and styling
- add a shortcut for listing out all overdue tasks or due tasks
- add a due date filter for listing tasks which due in a given period
- change how many row can be viewed at once. Now is fixed in 100 rows
- add unit tests in the backend to make sure functionalities always work as expected