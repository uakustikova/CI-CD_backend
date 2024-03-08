Photo Share App Server

> This is the central backend application for the Photo Share App system

# Table of Contents

* [Prerequisites](#prerequisites)
* [Install](#install)
* [Start Development](#start-development)
  * [Start the Database](#start-the-database)
  * [Start the Backend Application](#start-the-backend-application)
  * [Stop the Database](#stop-the-database)
  * [Stop the Backend Application](#stop-the-backend-application)
* [Build for Production](#build-for-production)
* [Problems](#problems)

## Prerequisites

* [Docker Desktop][docker_desktop]
* [Node.js 16.x][nodejs]

## Install

```sh
# cd into workdir (directory where the package.json is located)
$ npm i
```

## Start Development

In this section we will explain how you can start the database and the application.

### Start the Database

First you need to start the database. Make sure Docker desktop is up and running. Run the follwing command to start the database:

```sh
# cd into workdir (directory where the docker-compose.yaml is located)
$ docker-compose up
```

### Start the Backend Application

In a seperate terminal run the following to start the backend application:

```sh
# cd into workdir (directory where the package.json is located)
$ npm run start:dev
```

### Stop the Database

```sh
# click CTRL+C to abort the process
$ docker-compose down
```

### Stop the Backend Application

click CTRL+C to abort the process

## Build for Production

```sh
# cd into workdir (directory where the package.json is located)
$ npm run build
```
## Start Production Build

Make sure to create a .env file for all environment variables or pass them directly via the cli cmd.

```sh
# cd into workdir (directory where the package.json is located)
$ npm start
```

[docker_desktop]: https://www.docker.com/products/docker-desktop/
[nodejs]: https://nodejs.org/en/

## Seeds

In the directory `src/services/seeds` you can find all seeds for this project.
You need to make sure that there are no seeds in the production environment.

There are two default user:

email: admin@admin.admin
password: 1234

email: user@user.user
password: 1234

## Problems

In this section we will give you a quick overview of the most common problems.

### docker-compose up is not working

If you have problems with the database you can open docker dashboard and delete (remove) all containers and delete (remove) all volumes.
