package auth

import (
	"encoding/json"
	"log"
	"database/sql"
	"fmt"
	"net/http"
	_ "github.com/lib/pq"
	"strconv"
	"mylib/auth"
	"mylib/db"
)

func TokenAuthenteicate(w http.ResponseWriter, r http.Request){
	con := db.ConnectDb()

	var n = "testuser1"
	var p = "pwoftest1"
	var query = "SELECT * FROM users WHERE name = $1 AND password = $2"
	rows, err := con.Query(query,n,p)

	var b := auth.TokenGenerator(2)

}