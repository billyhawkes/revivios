package controller

import (
	"encoding/json"
	"net/http"

	"revivios.com/server/model"
)

func UserOne(w http.ResponseWriter, r *http.Request) {
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
