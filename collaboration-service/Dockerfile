FROM node:12-alpine as base

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
RUN npm install
COPY --chown=node:node . .
EXPOSE 8080

FROM base as dev
CMD ["npm", "run", "dev"]

FROM base as build
CMD ["npm", "run", "start"]

FROM base as test
CMD ["npm", "run", "test"]