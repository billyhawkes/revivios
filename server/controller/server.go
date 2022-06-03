package controller

import (
	"log"
	"net/http"
)

func Start() {
	server := &http.Server{Addr: ":8000", Handler: nil}
	log.Fatal(server.ListenAndServe())
}
