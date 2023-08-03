Navrhněte a naprogramujte REST API, ve kterém se budou držet úkoly. Každý úkol je součástí jednoho projektu a může mít 0 - 100 tagů. Vedle klasických CRUD operací je potřeba myslet na stránkování a filtrování, dle jakéhokoliv parametru (tag, popis, projekt). K API vytvořte dokumentaci ve svém oblíbeném nástroji.

Struktura pro projekt:
- Název
- Popis
- Datumy

Struktura pro úkol:
- Popis
- Stav úkolu (nový, v procesu, hotovo)

Struktura pro tag:
- Název

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# PostgresSQL in docker
$ docker compose up dev-db -d
```

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
