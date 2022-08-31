FROM node:lts-alpine as builder
COPY package.json ./
RUN npm install
RUN mkdir /app-ui
RUN mv ./node_modules ./app-ui
WORKDIR /app-ui
COPY . .

# start locally
FROM builder as start
CMD ["npm", "run", "start"]

# run tests
FROM builder as test
CMD ["npm", "run", "test"]

# generate static react files
FROM builder as build
RUN npm run build

# ---

FROM nginx:alpine

# copy the .conf template
COPY --from=builder nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page and replace it with the static files we created in the first step
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app-ui/build /usr/share/nginx/html
EXPOSE 80

CMD nginx -g 'daemon off;'
