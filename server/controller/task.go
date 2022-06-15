package controller

import (
	"encoding/json"
	"net/http"

	"strconv"

	"github.com/go-chi/chi/v5"
	"revivios.com/server/model"
)

func Tasks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	ctx := r.Context()
	userId := ctx.Value("userId").(uint64)

	tasks, err := model.FindAllTasks(userId)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
	}

	json.NewEncoder(w).Encode(tasks)
}

func CreateTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var newTask model.Task

	ctx := r.Context()
	userId := ctx.Value("userId").(uint64)

	err := json.NewDecoder(r.Body).Decode(&newTask)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
	}
	err = model.CreateTask(&newTask, userId)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
	}

	json.NewEncoder(w).Encode(newTask)
}

func UpdateTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var updateTask model.Task

	ctx := r.Context()
	userId := ctx.Value("userId").(uint64)

	err := json.NewDecoder(r.Body).Decode(&updateTask)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
	}
	err = model.UpdateTask(&updateTask, userId)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
	}

	json.NewEncoder(w).Encode(updateTask)
}

func DeleteTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	ctx := r.Context()
	userId := ctx.Value("userId").(uint64)

	id := chi.URLParam(r, "id")
	id_num, err := strconv.ParseUint(id, 10, 64)
	if err != nil {
		w.WriteHeader(400)
		w.Write([]byte(err.Error()))
		return
	}

	task, err := model.DeleteTask(&id_num, userId)
	if err != nil {
		w.WriteHeader(500)
		w.Write([]byte(err.Error()))
	}

	json.NewEncoder(w).Encode(task)
}

func FindOneTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	ctx := r.Context()
	userId := ctx.Value("userId").(uint64)

	id := chi.URLParam(r, "id")
	id_num, err := strconv.ParseUint(id, 10, 64)
	if err != nil {
		w.WriteHeader(400)
		w.Write([]byte(err.Error()))
		return
	}

	task, err := model.FindOneTask(&id_num, userId)
	if err != nil {
		w.WriteHeader(500)
		w.Write([]byte(err.Error()))
		return
	}

	json.NewEncoder(w).Encode(task)
}
