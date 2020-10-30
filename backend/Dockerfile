FROM node:12-alpine

RUN mkdir -p /home/node/m5server/node_modules && chown -R node:node /home/node/m5server

WORKDIR /home/node/m5server

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 6464

CMD ["node", "src/app.js"]