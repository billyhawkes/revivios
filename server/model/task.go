package model

import "time"

type Task struct {
	ID          uint64    `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Completed   bool      `json:"completed"`
	Date        time.Time `json:"date"`
}

func FindAllTasks() ([]Task, error) {
	tasks := []Task{}

	if err := db.Find(&tasks).Error; err != nil {
		return tasks, err
	}

	return tasks, nil
}

func CreateTask(task Task) error {
	if err := db.Create(&task).Error; err != nil {
		return err
	}
	return nil
}
