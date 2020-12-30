FROM doormat/ubuntu-openjdk8-node12:1.0.0 as builder

EXPOSE 3000

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build-css
ENTRYPOINT [ "npm", "run", "start" ]
