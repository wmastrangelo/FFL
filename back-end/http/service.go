package http

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"net/http"
	"os"

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

func getAllPlayersFromFile(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	file, err := os.Open("/Users/walkermastrangelo/allplayers.csv")
	if err != nil {
		panic(err)
	}
	defer file.Close()
	reader := csv.NewReader(file)

	records, err := reader.ReadAll()
	if err != nil {
		panic(err)
	}
	jsonRecords, err := json.Marshal(records)
	if err != nil {
		panic(err)
	}
	fmt.Fprint(w, string(jsonRecords))
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}
