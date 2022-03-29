# Test-task

Test work for the authorization process and work with files

## Requirements

* Node 14
* Docker
* Docker-compose

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/YuriyWebSpinner/test-task.git
cd test-task
```

```bash
npm install
```

```bash
docker-compose build
```

```bash
docker-compose up
```

Open `variables.env` and inject your credentials so it looks like this

```
MYSQL_ROOT_PASSWORD=<MYSQL_ROOT_PASSWORD>
MYSQL_DATABASE=<MYSQL_DATABASE>
MYSQL_USER=<MYSQL_USER>
MYSQL_PASSWORD=<MYSQL_PASSWORD>
MYSQL_LOCAL_PORT=<MYSQL_LOCAL_PORT>
MYSQL_DOCKER_PORT=<MYSQL_DOCKER_PORT>
MYSQL_HOST=<MYSQL_HOST>

NODE_LOCAL_PORT=<NODE_LOCAL_PORT>
NODE_DOCKER_PORT=<NODE_DOCKER_PORT>
FILE_PATH=<FILE_PATH>

JWT_ACCESS_SECRET=<JWT_ACCESS_SECRET>
JWT_REFRESH_SECRET=<JWT_REFRESH_SECRET>
```

## Aviable commands

Run app in dev mode

```bash
npm run dev
```

Running migrations to the database

```bash
npm run db:migrate
```

Rollback migrations in a database

```bash
npm run db:migrate:undo
```
Populate the database with fake data

```bash
npm run db:seed
```
