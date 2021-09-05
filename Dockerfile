FROM node:14

WORKDIR /app

ADD package.json /app/

RUN npm install

ADD . /app/

EXPOSE 3000
CMD ["npm", "run", "start"]
