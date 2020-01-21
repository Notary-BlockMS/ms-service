FROM node:8.16-alpine 

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8082

ENTRYPOINT [ "npm", "start" ]