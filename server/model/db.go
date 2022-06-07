package model

import (
	"fmt"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB

type PostgresConfig struct {
	Host     string
	User     string
	Password string
	Name     string
	Port     string
}

func Init() {
	config := &PostgresConfig{
		Host:     os.Getenv("DB_HOST"),
		User:     os.Getenv("DB_USER"),
		Password: os.Getenv("DB_PASS"),
		Name:     os.Getenv("DB_NAME"),
		Port:     os.Getenv("DB_PORT"),
	}

	var err error

	db, err = gorm.Open(postgres.Open(connectionString(config)), &gorm.Config{})
	if err != nil {
		fmt.Println("Database connection error.")
	}
	db.AutoMigrate(&Task{})
}

func connectionString(config *PostgresConfig) string {
	return fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=EST", config.Host, config.User, config.Password, config.Name, config.Port)
}
