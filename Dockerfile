FROM nginx:stable-alpine as host

WORKDIR /src

RUN apk update && apk upgrade
RUN apk add bash

RUN apk add openjdk8
RUN apk add nodejs
RUN apk add npm

FROM host

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build-css

EXPOSE 3000 25565 25575

CMD [ "npm", "start" ]


