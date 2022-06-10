package model

type User struct {
	ID    uint64 `gorm:"primary_key" json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
	XP    uint64 `json:"xp"`
}

func FindOneUser(id *uint64) (User, error) {
	var user User

	if err := db.First(&user, id).Error; err != nil {
		return user, err
	}
	return user, nil
}

func CreateUser(name string, email string) (User, error) {
	user := User{Name: name, Email: email}

	if err := db.Create(&user).Error; err != nil {
		return user, err
	}

	return user, nil
}
