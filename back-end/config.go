package backend

import (
	"encoding/json"
	"io"
	"os"
)

func NewConfig() (map[string]interface{}, error) {
	file, err := os.Open("ffl-back-end.json")
	if err != nil {
		return nil, err
	}
	defer file.Close()

	bytes, err := io.ReadAll(file)
	if err != nil {
		return nil, err
	}

	var config map[string]interface{}

	err = json.Unmarshal(bytes, &config)
	if err != nil {
		return nil, err
	}

	return config, nil
}
