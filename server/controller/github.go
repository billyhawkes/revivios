package controller

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
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
	w.Header().Set("Content-Type", "application/json")

	// Verify State
	state := r.URL.Query().Get("state")
	if state != "state" {
		fmt.Println("States don't match")
		return
	}

	// Get code
	code := r.URL.Query().Get("code")

	// Get Token
	conf := config.GithubConfig()
	token, err := conf.Exchange(context.Background(), code)
	if err != nil {
		fmt.Println("Code-Token exchange failed")
	}

	// Get User Data
	req, err := http.NewRequest("GET", "https://api.github.com/user", nil)
	if err != nil {
		fmt.Println("Error creating request")
	}
	req.Header.Set("Authorization", "token "+token.AccessToken)
	res, err := http.DefaultClient.Do(req)
	if err != nil {
		fmt.Println("Error fetching user data")
	}
	userData, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println("Error parsing user data")
	}

	// Get User Email
	req2, err := http.NewRequest("GET", "https://api.github.com/user/emails", nil)
	if err != nil {
		fmt.Println("Error creating request")
	}
	req2.Header.Set("Authorization", "token "+token.AccessToken)
	res2, err := http.DefaultClient.Do(req2)
	if err != nil {
		fmt.Println("Error fetching user data")
	}
	userData2, err := ioutil.ReadAll(res2.Body)
	if err != nil {
		fmt.Println("Error parsing user data")
	}

	// Decode name
	var user map[string]string
	json.Unmarshal(userData, &user)
	name := user["name"]

	// Decode email
	var emails []map[string]string
	json.Unmarshal(userData2, &emails)
	email := emails[0]["email"]

	newUser, err := model.CreateUser(name, email)
	if err != nil {
		fmt.Println("Error creating user")
	}

	access_token, err := auth.CreateJWT(newUser.ID, email)
	if err != nil {
		fmt.Println("Error creating JWT")
	}

	// Redirect back to user
	http.Redirect(w, r, os.Getenv("OAUTH_REDIRECT_URL")+"/"+access_token, http.StatusFound)
}
