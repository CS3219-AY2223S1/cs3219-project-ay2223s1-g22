FROM node:lts-alpine as setup
COPY package.json ./
RUN npm install
RUN mkdir /app-ui
RUN mv ./node_modules ./app-ui
WORKDIR /app-ui
COPY . .

# start locally
FROM setup as dev
CMD ["npm", "run", "start"]

# run tests
FROM setup as test
CMD ["npm", "run", "test"]

# generate static react files
FROM setup as builder
RUN npm run build

# ---

FROM nginx:alpine as build

# copy the .conf template
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Remove default nginx index page and replace it with the static files we created in the first step
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app-ui/build /usr/share/nginx/html

ENV PORT 8080
EXPOSE 8080

CMD nginx -g 'daemon off;'
