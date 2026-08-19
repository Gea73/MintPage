# syntax=docker/dockerfile:1

# bookworm slim used for better compatibility than alpine
FROM node:24-bookworm-slim
ENV NODE_ENV=production

WORKDIR /app

COPY  package.json package*.json ./

# install dependencies unless if is dev
RUN npm ci --omit=dev

COPY . .

USER node

# expose to internal docker network
EXPOSE 5000

#runs the server app
CMD ["node","src/server/server.js"]
