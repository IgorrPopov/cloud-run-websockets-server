FROM node:14.18-alpine as build

# Prepare external variables
ARG _REDIS_HOST
ENV REDIS_HOST=$_REDIS_HOST

ARG _REDIS_PORT
ENV REDIS_PORT=$_REDIS_PORT

ARG _REDIS_PASSWORD
ENV REDIS_PASSWORD=$_REDIS_PASSWORD

ARG _PORT
ENV PORT=$_PORT

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm i
COPY . .
RUN npm run build

FROM node:14.18-alpine

WORKDIR /app
COPY package.json .
RUN npm i --only-production
COPY --from=build /app/dist ./dist

CMD npm run start:prod