FROM node:16-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY pnpm-lock.yaml ./

RUN pnpm fetch --prod

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

ADD . ./
RUN pnpm install -r --offline --prod

EXPOSE 8000

CMD ["pnpm", "deploy:server"]