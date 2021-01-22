FROM doormat/ubuntu-openjdk8-node12:1.0.0 as builder

WORKDIR /src

COPY package.json .
COPY server/views/css/styles.css server/views/css/styles.css

RUN npm install
RUN npm run build-css


FROM doormat/ubuntu-openjdk8-node12:1.0.0

RUN apt-get update
RUN apt-get install vim -y

EXPOSE 3000 25565 25575
CMD [ "npm", "start" ]

WORKDIR /app
COPY . .
COPY --from=builder /src .
