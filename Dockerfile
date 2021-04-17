FROM mhart/alpine-node:14
WORKDIR /app
COPY package.json yarn.lock ./

# Needs GCC for argon2 hashing
RUN apk add --no-cache make gcc g++ python3

RUN yarn install
RUN touch ormconfig.json

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]