FROM node:14.4.0-alpine3.10 as build-stage

USER root

RUN apk update

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine as production-stage
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/conf.d/ /etc/nginx/conf.d

COPY --from=build-stage /app/dist /var/www
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
