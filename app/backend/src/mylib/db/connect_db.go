package db

import (
        "database/sql"
        "encoding/json"
        "fmt"
        "net/http"
        _ "github.com/lib/pq"
)

func ConnectDb() *sql.DB{
        info := fmt.Sprintf("host=%s port=%d user=%s dbname=%s sslmode=disable",db_host,db_port,db_user,db_name)
        db, err := sql.Open("postgres",info)
        if err != nil {
                panic(err)
        }

        err = db.Ping()
        if err !=nil {
                panic(err)
        }

        return db
}
