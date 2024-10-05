FROM node:16.17.0
WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

COPY .env /usr/src/app/.env

EXPOSE 80

CMD ["node", "index.js"]


