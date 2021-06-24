package db

import (
        "database/sql"
        "fmt"
)

const (
        db_host = "db"
        db_port = 5432
        db_user = "keeykeey"
        db_name = "keeykeey"
)

func ConnectDb() *sql.DB{
        info := fmt.Sprintf("host=%s port=%d user=%s dbname=%s sslmode=disable",db_host,db_port,db_user,db_name)
        con, err := sql.Open("postgres",info)
        if err != nil {
                panic(err)
        }

        err = con.Ping()
        if err !=nil {
                panic(err)
        }

        return con
}
