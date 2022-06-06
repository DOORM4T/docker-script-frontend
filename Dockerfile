FROM nginx:stable-alpine as host

WORKDIR /src

RUN apk update && apk upgrade
RUN apk add bash

RUN apk add openjdk8
RUN apk add nodejs
RUN apk add npm


FROM host as builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build-css


FROM builder

RUN chmod +x start.sh

EXPOSE 80 25565 25575

CMD ["./start.sh"]


