package controller

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

type Error struct {
	msg string
}

func Start() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	// Tasks
	r.Get("/tasks", Tasks)
	r.Post("/tasks", TasksCreate)
	r.Put("/tasks", TaskUpdate)
	r.Delete("/tasks/{id}", TaskDelete)

	http.ListenAndServe(":8000", r)
}
