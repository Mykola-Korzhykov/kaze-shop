FROM node:19.4.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm uninstall bcrypt

RUN npm install bcrypt

RUN npm install glob rimraf

COPY . .

COPY ./dist ./dist

CMD ["npm", "run", "start:prodpack"]