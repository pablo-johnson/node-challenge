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
  - Get a Football-data API key from [here]([https://docs.nestjs.com/support](https://www.football-data.org/))
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
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
