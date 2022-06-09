package controller

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"revivios.com/server/auth"
)

func Start() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	// CORS
	r.Use(cors.Handler(cors.Options{
		// AllowedOrigins:   []string{"https://foo.com"}, // Use this to allow specific origin hosts
		AllowedOrigins: []string{"https://*", "http://*"},
		// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token", "access_token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))

	// Protected Routes
	r.Group(func(r chi.Router) {
		// Tasks
		r.Get("/tasks", auth.JWTGuard(Tasks))
		r.Post("/tasks", auth.JWTGuard(TasksCreate))
		r.Put("/tasks", auth.JWTGuard(TaskUpdate))
		r.Delete("/tasks/{id}", auth.JWTGuard(TaskDelete))
		r.Get("/tasks/{id}", auth.JWTGuard(TaskOne))

		// User
		r.Get("/user", auth.JWTGuard(UserOne))
	})

	// Github
	r.Get("/auth/github", GithubLogin)
	r.Get("/auth/github/callback", GithubCallback)

	http.ListenAndServe(":8000", r)
}
