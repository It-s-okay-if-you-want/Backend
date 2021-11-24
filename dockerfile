FROM node:14

WORKDIR /usr/src/app

COPY package.json package.json

RUN npm install

volume ["/usr/src/app/public"]

COPY . .

CMD ["npm", "run", "start"]