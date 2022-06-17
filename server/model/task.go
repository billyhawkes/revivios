package model

import (
	"time"

	"gorm.io/gorm/clause"
)

type Task struct {
	ID          uint64     `gorm:"primary_key" json:"id"`
	Name        string     `json:"name"`
	Description string     `json:"description"`
	Completed   bool       `json:"completed"`
	Date        *time.Time `json:"date"`
	UserID      uint64     `json:"userId"`
}

func FindAllTasks(userId uint64) ([]Task, error) {
	tasks := []Task{}

	if err := db.Where("UserID = ?", userId).Find(&tasks).Error; err != nil {
		return tasks, err
	}

	return tasks, nil
}

func CreateTask(task *Task) error {
	if err := db.Create(&task).Error; err != nil {
		return err
	}
	return nil
}

func UpdateTask(task *Task) error {
	if err := db.Save(&task).Error; err != nil {
		return err
	}
	return nil
}

func FindOneTask(id *uint64, userId uint64) (Task, error) {
	var task Task

	if err := db.Where("UserID = ?", userId).First(&task, id).Error; err != nil {
		return task, err
	}
	return task, nil
}

func DeleteTask(id *uint64, userId uint64) (Task, error) {
	var task Task

	if err := db.Clauses(clause.Returning{}).Where("UserID = ?", userId).Delete(&task, id).Error; err != nil {
		return task, err
	}

	return task, nil
}
