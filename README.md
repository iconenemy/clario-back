
## Description

[Clario] Backend API

## Running the app

```bash
# development
$ docker compose -f docker-compose.dev.yml up

# production mode
$ docker compose -f docker-compose.prod.yml up
```

## Swagger UI

```bash
# swagger docs
$ http://localhost:8000/swagger

# swagger yaml
$ http://localhost:8000/swagger/yaml
```

## Prisma
```bash
# prisma studio
$ pnpm db:studio
```
