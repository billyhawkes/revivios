package controller

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func Start() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	// Tasks
	r.Get("/tasks", Tasks)
	r.Post("/tasks", TasksCreate)
	r.Put("/tasks", TaskUpdate)
	r.Delete("/tasks/{id}", TaskDelete)
	r.Get("/tasks/{id}", TaskOne)

	http.ListenAndServe(":8000", r)
}
