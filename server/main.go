package main

import (
	"encoding/json"
	"log"
	"net/http"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var dsn = "host=localhost user=postgres password=postgres dbname=go-test port=5432 sslmode=disable TimeZone=EST"
var db, _ = gorm.Open(postgres.Open(dsn), &gorm.Config{})

type Book struct {
	gorm.Model
	ID     uint
	Title  string
	Author string
	Pages  uint
}

func Hello(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello"))
}

func CreateBook(w http.ResponseWriter, r *http.Request) {
	var newBook Book

	err := json.NewDecoder(r.Body).Decode(&newBook)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
	}

	w.Header().Set("Content-Type", "application/json")
	db.Create(&Book{Title: newBook.Title, Author: newBook.Author, Pages: newBook.Pages})

	json.NewEncoder(w).Encode(newBook)
}

func Books(w http.ResponseWriter, r *http.Request) {
	var books []Book

	db.Limit(10).Find(&books)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(books)
}

func main() {
	// Connect to DB

	db.AutoMigrate(&Book{})

	// Controller
	http.HandleFunc("/", Hello)
	http.HandleFunc("/create", CreateBook)
	http.HandleFunc("/books", Books)

	log.Fatal(http.ListenAndServe(":5000", nil))
}
