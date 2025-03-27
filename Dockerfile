
# DEVELOPMENT STAGE
FROM node:22-alpine as development

WORKDIR /usr/app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./

RUN pnpm fetch

COPY . .

RUN pnpm install
RUN npx prisma generate

# BUILD STAGE
FROM node:22-alpine as build

WORKDIR /usr/app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./

COPY --from=development /usr/app/prisma ./prisma

COPY --from=development /usr/app/node_modules ./node_modules

COPY . .

RUN pnpm build
RUN pnpm install --offline --prod

# PRODUCTION STAGE
FROM node:22-alpine as production

COPY --from=build /usr/app/dist ./dist

COPY --from=build /usr/app/prisma ./prisma

COPY --from=build /usr/app/node_modules ./node_modules

CMD ["node", "dist/main"]
