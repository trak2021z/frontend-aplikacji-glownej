FROM node:14.4.0-alpine3.10

USER root

RUN apk update
RUN apk add --no-cache \
    git 
WORKDIR /app
RUN git clone https://github.com/aplikacje-internetowe-l2/frontend-aplikacji-glownej.git

WORKDIR /app/frontend-aplikacji-glownej
RUN cp .env.example .env
RUN npm install
