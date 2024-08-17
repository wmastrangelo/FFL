package http

import (
	"fmt"
	"net/http"
	"encoding/csv"

	"github.com/gorilla/mux"
)

func StartServer() {
	router := mux.NewRouter()

	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, "Hello, World!")
	})
	router.HandleFunc("/allplayers", getAllPlayersFromFile)

	http.ListenAndServe(":9876", router)
}

func getAllPlayersFromFile(w http.ResponseWriter, r *http.Request) (string, error) {
	file, err := os.Open("/opt/common/allplayers.csv")
	if err != nil {
		panic(err)
	}
	defer file.Close()
	reader := csv.NewReader(file)
	
	records,err := reader.ReadAll()
	if err != nil{
		panic(err)
	}
	w.Write([]byte(records))
}