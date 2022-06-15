package controller

import (
	"encoding/json"
	"net/http"

	"revivios.com/server/model"
)

func FindOneUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	ctx := r.Context()
	userId := ctx.Value("userId").(uint64)

	user, err := model.FindOneUser(&userId)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
	}

	json.NewEncoder(w).Encode(user)
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var updateUser model.User

	ctx := r.Context()
	userId := ctx.Value("userId").(uint64)

	err := json.NewDecoder(r.Body).Decode(&updateUser)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
	}

	if userId != updateUser.ID {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("Unauthorized."))
	}

	updatedUser, err := model.UpdateUser(updateUser)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
	}

	json.NewEncoder(w).Encode(updatedUser)
}
