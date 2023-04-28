FROM node:19.2.0-alpine

RUN apk update

WORKDIR /client

COPY package*.json ./

RUN npm install -g npm

RUN npm install --force

COPY . .

ENV NODE_ENV production

RUN npm cache clean --force

RUN npm run build

CMD ["npm", "run", "start"]

EXPOSE 3000
