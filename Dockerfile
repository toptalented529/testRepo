# syntax=docker/dockerfile:1
FROM node:16-alpine AS builder

WORKDIR "/app"

COPY . .

RUN echo "@firstclose:registry=https://npm.pkg.github.com" >> .npmrc
RUN echo "//npm.pkg.github.com/:_authToken=\${GITHUB_PACKAGES_TOKEN}" >> .npmrc

RUN --mount=type=secret,id=github_registry_token \
  GITHUB_PACKAGES_TOKEN=$(cat /run/secrets/github_registry_token) npm ci

# add webpack for the build process
RUN npm i webpack --save-dev

RUN npm run build

RUN npm prune --production

FROM node:16-alpine AS production

WORKDIR "/app"

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

CMD [ "sh", "-c", "npm run start:prod"]
