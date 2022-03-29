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
docker-compose build
```

```bash
docker-compose up
```

```bash
npm install
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
