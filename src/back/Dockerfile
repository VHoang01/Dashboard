FROM node:16

WORKDIR /usr/src/app

COPY package.json ./
COPY src src
COPY .env .env

RUN npm install

EXPOSE 8080

CMD [ "node", "./src/app.js"]