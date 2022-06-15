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

func UpdateUser(user User) (User, error) {
	if err := db.Model(&user).Omit("ID", "XP").Updates(&user).Error; err != nil {
		return user, err
	}
	return user, nil
}

func FindOrCreateUser(name string, email string) (User, error) {
	var user User

	// Find
	if err := db.Where("email = ?", email).First(&user).Error; err != nil {
		// Create
		if err := db.Create(&user).Error; err != nil {
			return user, err
		}
		return user, err
	}
	return user, nil
}
