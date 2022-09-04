FROM node:16.13.0-alpine as base
WORKDIR /usr/app
COPY package.json .
RUN npm install --quiet
COPY . .
EXPOSE 8080

FROM base as dev
CMD ["npm", "run", "dev"]

FROM base as build
CMD ["npm", "run", "start"]

FROM base as test
CMD ["npm", "run", "test"]