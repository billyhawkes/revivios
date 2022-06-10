package main

import (
	"revivios.com/server/config"
	"revivios.com/server/controller"
	"revivios.com/server/model"
)

func main() {
	config.Init()
	model.Init()
	controller.Start()
}
