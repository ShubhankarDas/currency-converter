FROM node:8
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
ENV port=3000
CMD node app.js
EXPOSE 3000