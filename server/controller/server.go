package controller

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"revivios.com/server/auth"
)

func Start() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	// Protected Routes
	r.Group(func(r chi.Router) {
		// Tasks
		r.Get("/tasks", auth.JWTGuard(Tasks))
		r.Post("/tasks", auth.JWTGuard(TasksCreate))
		r.Put("/tasks", auth.JWTGuard(TaskUpdate))
		r.Delete("/tasks/{id}", auth.JWTGuard(TaskDelete))
		r.Get("/tasks/{id}", auth.JWTGuard(TaskOne))

		// User
		r.Get("/users/{id}", auth.JWTGuard(UserOne))
	})

	// Github
	r.Get("/auth/github", GithubLogin)
	r.Get("/auth/github/callback", GithubCallback)

	http.ListenAndServe(":8000", r)
}
