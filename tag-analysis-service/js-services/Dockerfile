FROM node:16

WORKDIR /

COPY package*.json ./

RUN npm cache clean --force

RUN npm install

COPY . .

EXPOSE 4001

CMD ["npm", "start"]