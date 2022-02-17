# Items

NodeJS microservice that exposes endpoints to get items and details data.

## Health

```url
http://0.0.0.0:3000/api/items/health
```

## Load environment variables

In the project directory, you must create env file (.env) with values:

E.g.

```bash
export $(cat .env)


APP_PORT=3001
HOST_URL=https://api.mercadolibre.com
TIMEOUT=20000
```

## NPM

### Run project

```bash
npm run start
```

### Test and Coverage

```bash
npm run test
npm run coverage
```
