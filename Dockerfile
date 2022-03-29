FROM node:14

WORKDIR /ximxim-test/
COPY package.json .
RUN npm install
COPY . .
CMD npm run dev
