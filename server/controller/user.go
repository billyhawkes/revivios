package controller

import (
	"encoding/json"
	"net/http"

	"revivios.com/server/model"
)

func UserOne(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	ctx := r.Context()
	user_id := ctx.Value("user_id").(uint64)

	user, err := model.FindOneUser(&user_id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
	}

	json.NewEncoder(w).Encode(user)
}
