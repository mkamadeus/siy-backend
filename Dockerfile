# STAGE 1 : Install modules
FROM mhart/alpine-node:14
WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]