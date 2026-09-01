# syntax=docker/dockerfile:1

# bookworm slim used for better compatibility than alpine
FROM node:24-bookworm-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src
RUN npm run build
RUN mkdir -p dist/client/public
RUN mkdir -p dist/client/private
RUN cp -r src/client/public/* dist/client/public/
RUN cp -r src/client/private/* dist/client/private/

FROM node:24-bookworm-slim AS production

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

# install dependencies unless if is dev
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist


USER node

# expose to internal docker network
EXPOSE 5000

#runs the server app
CMD ["node","dist/server/server.js"]
