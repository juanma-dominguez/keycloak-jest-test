FROM node:14.16.1

RUN apt-get -y update && apt-get -y upgrade

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --production

COPY dist ./dist

EXPOSE 3000
ENV SERVER_PORT=3000

CMD [ "node", "dist/server" ]