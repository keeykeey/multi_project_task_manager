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
)

const(
    db_host = "db"
	db_port = 5432
	db_user = "keeykeey"
	db_name = "keeykeey"
)

func connectDB() *sql.DB{
	info := fmt.Sprintf(
		"host = %s 
		port = %d
		user = %s
		dbname = %s
		sslmode = disable"
		,db_host,db_port,db_user,db_name
	)
	con, err := sql.Open("postgres",info)
	if err != nil {
		panic(err)
	}

	err =con.Ping()
	if err != nil {
		panic(err)
	}

	return con
}

func TokenAuthenteicate(w http.ResponseWriter, r http.Request){
	con := ConnectDb()

	var n = "testuser1"
	var p = "pwoftest1"
	var query = "SELECT * FROM users WHERE name = $1 AND password = $2"
	rows, err := con.Query(query,n,p)

	var b := auth.TokenGenerator(2)

}