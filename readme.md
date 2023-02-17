## Node JS Admin Panel / API Resource Backend Project

This is a NodeJS powered Web Application, Backend and API Resource hub for it's client interface.

## Installation

**Prepare a location for the project.** We will name the directory `server`. Inside the project directory, set up git and pull from the repository. Or alternatively, download the project to the location.

```bash
git init
git pull https://github.com/samiksengupta/mevn-server.git
```

OR

```bash
git clone https://github.com/samiksengupta/mevn-server.git .
```
**Install dependencies.** This may take a while.

```bash
npm install
```

**Create a `.env` file** at the project root and copy contents from here into it.

```
HOST=localhost
PORT=3000
NODE_ENV=development

APP_NAME=server

DEV_DB_HOSTNAME=localhost
DEV_DB_NAME=db_server
DEV_DB_USERNAME=<YOUR DB USERNAME HERE>
DEV_DB_PASSWORD=<YOUR DB PASSWORD HERE>
DEV_DB_DIALECT=mysql

TEST_DB_HOSTNAME=localhost
TEST_DB_NAME=db_server
PROD_DB_USERNAME=<YOUR DB USERNAME HERE>
TEST_DB_PASSWORD=<YOUR DB PASSWORD HERE>
TEST_DB_DIALECT=mysql

PROD_DB_HOSTNAME=localhost
PROD_DB_NAME=db_server
PROD_DB_USERNAME=<YOUR DB USERNAME HERE>
PROD_DB_PASSWORD=<YOUR DB PASSWORD HERE>
PROD_DB_DIALECT=mysql

JWT_SECRET=<YOUR JWT SECRET HERE>
JWT_LIFESPAN=600
```

When you have set up your database configuration, **run migrations and seeders** to generate tables from the schema and populate them with data. The following scripts can be used to quickly setup the server and run migrations/seeders.

**Run server using nodemon**

```bash
npm run server
```

**Create database and run migrations**

```bash
npm run setup
```

**Wipe db, run migrations and seeders**

```bash
npm run reset
```

**Generate cryptographically secure string for `JWT_SECRET` and copy it to `.env`**

```bash
npm run crypto
```

### Todo

* ~~Create api to regenerate token~~
* ~~Validation~~
* ~~Basic routing, controller and model for user and authentication~~
* Create BaseModel with feature to generate forms, datatable config and other metadata regarding models
* Create ModelController and automatic routing with Crud functionality
* Unit tests
