<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  

## Description

Santex Back-end Developer Hiring Test

The goal is to create a project that exposes an API built with GraphQL, with a mutation and some queries.

## Prerequisites

- Docker
- Docker-compose
- Node

## Installation

- Clone the code
- Change the file `.env.template` to `.env`.
  - Get a Football-data API key from here https://www.football-data.org/
  - Replace the value of `FOOTBALL_API_TOKEN` in the `.env` file
  - Set appropriate values for `POSTGRES_USER` and `POSTGRES_PASSWORD`
- Execute
  ```bash
  $ docker-compose build
  $ docker-compose up
  ```
- The app is up and running in port `LISTENING_PORT` (3003)
- You can use the playground on http://localhost:3003/graphql


## Test

```bash
# unit tests
$ docker exec -it app sh -c "npm run test"

```

## Decision Making

### Web Framework

The decision to use Nest https://www.nestjs.com as a web framework was because it is an open-source framework with a lot of adoption in the market, the documentation is of great quality, and it is easy to learn, especially for people who have a background in Angular. It is based on Express, a widely used framework, but also allows us to replace it with Fastify, another new framework. 
It also provides a fast and easy integration with ORMs such as TypeOrm, Prisma, Knex.js, and others. It also provides great ease to implement GraphQL through Apollo. It is a modern and versatile framework for different circumstances.

### Dependency Manager

NPM and Yarn are great choices as dependency handlers. I have worked with both and both offer similar functionality and performance so there is no particular reason to have chosen, in this case, NPM.

### DataBase and ORM

PostgreSQL is the database engine chosen for this project but the great abstraction provided by **TypeOrm** makes that, for this case, the particular details of one or another database are not very visible. TypeOrm was chosen as ORM because of the great abstraction it provides and the great integration it has with Nest, in addition to its documentation and great community.

### GraphQL

Uno de los requisitos del presente trabajo es exponer el API de football-data a traves de un API elaborada con GraphQL. Para esto se utilizo Apolo, uno de los mas conocidos frameworks para implementar APIs con GraphQL.


