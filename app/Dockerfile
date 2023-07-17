# build stage
FROM node:lts-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
COPY node_modules ./node_modules/ 

RUN npm install

ARG EXPOSED_PORT

EXPOSE ${EXPOSED_PORT}

# CMD ["npm", "run", "start:dev"]