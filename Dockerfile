FROM node:21.2.0

COPY backend/ /home/node/ticket/

WORKDIR /home/node/ticket

RUN npm i

#CMD node app.js

CMD [ "npm", "run", "start" ]