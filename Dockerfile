FROM node:20-alpine

USER node

WORKDIR /home/node/app

COPY --chown=node package*.json ./

RUN npm install

COPY --chown=node . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]