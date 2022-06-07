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

	tasks, err := model.FindAllTasks()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
	}

	json.NewEncoder(w).Encode(tasks)
}

func TasksCreate(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var newTask model.Task

	err := json.NewDecoder(r.Body).Decode(&newTask)
	err = model.CreateTask(&newTask)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
	}

	json.NewEncoder(w).Encode(newTask)
}

func TaskUpdate(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var updateTask model.Task

	err := json.NewDecoder(r.Body).Decode(&updateTask)
	err = model.UpdateTask(&updateTask)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
	}

	json.NewEncoder(w).Encode(updateTask)
}

func TaskDelete(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id := chi.URLParam(r, "id")
	id_num, err := strconv.ParseUint(id, 10, 64)
	if err != nil {
		w.WriteHeader(400)
		w.Write([]byte(err.Error()))
		return
	}

	task, err := model.DeleteTask(&id_num)
	if err != nil {
		w.WriteHeader(500)
		w.Write([]byte(err.Error()))
		return
	}

	json.NewEncoder(w).Encode(task)
}
