FROM golang:latest

WORKDIR /app

COPY server/go.mod ./
COPY server/go.sum ./

RUN go mod download

ADD server/ .

COPY server/config/.env.production config/.env

EXPOSE 8000

RUN go build

CMD ["./server"]