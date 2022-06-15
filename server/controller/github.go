package controller

import (
	"log"
	"net/http"
	"os"

	"revivios.com/server/auth"
	"revivios.com/server/config"
	"revivios.com/server/model"
)

func GithubLogin(w http.ResponseWriter, r *http.Request) {
	conf := config.GithubConfig()
	url := conf.AuthCodeURL("state")

	http.Redirect(w, r, url, http.StatusSeeOther)
}

func GithubCallback(w http.ResponseWriter, r *http.Request) {
	state := r.URL.Query().Get("state")
	if state != "state" {
		log.Println("states do not match in oauth2 request")
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("states do not match in oauth2 request"))
	}

	code := r.URL.Query().Get("code")

	user, err := auth.GetUserFromGithub(code)
	if err != nil {
		log.Println(err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
	}

	createdUser, err := model.FindOrCreateUser(user.Name, user.Email)
	if err != nil {
		log.Println(err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
	}

	access_token, err := auth.CreateJWT(createdUser.ID, user.Email)
	if err != nil {
		log.Println(err.Error())
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
	}

	http.Redirect(w, r, os.Getenv("OAUTH_REDIRECT_URL")+"?token="+access_token, http.StatusFound)
}
