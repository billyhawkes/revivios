package auth

import (
	"context"
	"encoding/json"
	"io"
	"net/http"

	"revivios.com/server/config"
	"revivios.com/server/model"
)

func getGithubUser(token string) (string, error) {
	var name string

	req, err := http.NewRequest("GET", "https://api.github.com/user", nil)
	if err != nil {
		return name, err
	}
	req.Header.Set("Authorization", "token "+token)
	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return name, err
	}

	userData, err := io.ReadAll(res.Body)
	if err != nil {
		return name, err
	}

	var user map[string]interface{}
	err = json.Unmarshal(userData, &user)
	if err != nil {
		return name, err
	}
	name = user["name"].(string)

	return name, nil
}

func getGithubEmail(token string) (string, error) {
	var email string

	req, err := http.NewRequest("GET", "https://api.github.com/user/emails", nil)
	if err != nil {
		return email, err
	}
	req.Header.Set("Authorization", "token "+token)
	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return email, err
	}

	userData, err := io.ReadAll(res.Body)
	if err != nil {
		return email, err
	}

	var emails []map[string]interface{}
	err = json.Unmarshal(userData, &emails)
	if err != nil {
		return email, err
	}
	email = emails[0]["email"].(string)

	return email, nil
}

func GetUserFromGithub(code string) (model.User, error) {
	var user model.User
	conf := config.GithubConfig()
	token, err := conf.Exchange(context.Background(), code)
	if err != nil {
		return user, err
	}

	email, err := getGithubEmail(token.AccessToken)
	if err != nil {
		return user, err
	}
	name, err := getGithubUser(token.AccessToken)
	if err != nil {
		return user, err
	}

	user.Email = email
	user.Name = name

	return user, nil
}
