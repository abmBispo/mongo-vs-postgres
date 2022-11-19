FROM node:lts-alpine3.16

WORKDIR /app

RUN apk add --no-cache build-base git

COPY src src
COPY package.json package-lock.json ./

RUN npm install
