FROM node:14-alpine

WORKDIR /usr/src/node

COPY *.* ./

RUN yarn install

COPY . ./usr/src/node

CMD if [ "$ENV" = "development" ]; \
      then yarn start:dev; \
    else \
      yarn start; fi 