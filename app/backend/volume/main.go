//https://medium.com/swlh/building-a-restful-api-with-go-and-postgresql-494819f51810package main
package main

import (
        "database/sql"
        "encoding/json"
        "fmt"
        "log"
        "net/http"
        _ "github.com/lib/pq"
)

type User struct {
        Name string `json:"name"`
        Password string `json:"name"`
}

const (
        host = "db"//"172.18.0.1"
        port = 5432
        user = "keeykeey"
        pw = "keeykeey"
        dbname = "keeykeey"
)

func OpenConnection() *sql.DB{
        //info := fmt.Sprintf("host=%s port=%d user=%s pw=%s dbname=%s sslmode=disable",host,port,user,pw,dbname)
        info := fmt.Sprintf("host=%s port=%d user=%s dbname=%s sslmode=disable",host,port,user,dbname)
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

func GETHandler(w http.ResponseWriter,r *http.Request){
        db := OpenConnection()

        rows,err := db.Query("SELECT * FROM users")
        if err != nil {
                log.Fatal(err)
        }

        var users []User

        for rows.Next(){
                var user User
                rows.Scan(&user.Name, &user.Password)
                users = append(users,user)
        }

        userBytes, _ := json.MarshalIndent(user,"","\t")

        w.Header().Set("Content-Type","application/json")
        w.Write(userBytes)

        defer rows.Close()
        defer db.Close()
}

func POSTHandler(w http.ResponseWriter,r *http.Request){
        db := OpenConnection()

        var u User
        err := json.NewDecoder(r.Body).Decode(&u)
        if err != nil {
                http.Error(w, err.Error(),http.StatusBadRequest)
                return
        }

        sqlStatement := `INSERT INTO users (name,password) VALUES ($1,$2) `
        _, err = db.Exec(sqlStatement,u.Name,u.Password)
        if err != nil {
                w.WriteHeader(http.StatusBadRequest)
                panic(err)
        }

        w.WriteHeader(http.StatusOK)
        defer db.Close()
}

func main(){
        http.HandleFunc("/",GETHandler)
        http.HandleFunc("/post", POSTHandler)
        log.Fatal(http.ListenAndServe(":8080",nil))
}




















//
