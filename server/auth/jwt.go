package auth

import (
	"context"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
)

type JWTClaims struct {
	ID    uint64 `json:"id"`
	Email string `json:"email"`
	jwt.StandardClaims
}

func CreateJWT(id uint64, email string) (string, error) {
	claims := &JWTClaims{id, email, jwt.StandardClaims{ExpiresAt: time.Now().Add(time.Minute * 15).Unix()}}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	ss, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	return ss, err
}

func JWTGuard(next func(w http.ResponseWriter, r *http.Request)) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		tokenString := r.Header.Get("access_token")

		if tokenString != "" {
			token, err := jwt.ParseWithClaims(tokenString, &JWTClaims{}, func(token *jwt.Token) (interface{}, error) {
				return []byte(os.Getenv("JWT_SECRET")), nil
			})
			if err != nil {
				log.Println(err.Error())
				w.WriteHeader(http.StatusInternalServerError)
				w.Write([]byte(err.Error()))
			}

			if claims, ok := token.Claims.(*JWTClaims); ok && token.Valid {
				ctx := context.WithValue(r.Context(), "user_id", claims.ID)
				next(w, r.WithContext(ctx))
			} else {
				log.Println(err.Error())
				w.WriteHeader(http.StatusUnauthorized)
				w.Write([]byte(err.Error()))
			}
		} else {
			log.Println("no access token")
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte("no access token sent."))
		}

	}
}
