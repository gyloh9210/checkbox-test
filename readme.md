## docker-postgres
- run `docker compose up` to boot the postgres container

## express-backend
- run `npn run dev` to start
- run `npm run migrate` to start the schema initialization
- run `npm run seed` to seed test data

#### Folder structure
- controllers - determine what response to send back, validate payload and control data transmission to a model
- migrations - contain table schema
- model - usually contain business logic, but in this case, it just plainly read/write data to a table
- seeds - contain seeders

## task-dashboard
- run `npm run start`to start
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