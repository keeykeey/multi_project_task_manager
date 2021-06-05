//https://medium.com/swlh/building-a-restful-api-with-go-and-postgresql-494819f51810package main
package main

import (
        "encoding/json"
        "log"
        "net/http"
        _ "github.com/lib/pq"
        "mylib/db"
)

type User struct {
        Name string `json:"name"`
        Password string `json:"name"`
}

func GETHandler(w http.ResponseWriter,r *http.Request){
        con := db.ConnectDb()

        rows,err := con.Query("SELECT * FROM users;")
        if err != nil {
                log.Fatal(err)
        }

        var users []User

        for rows.Next(){
                var user User
                rows.Scan(&user.Name, &user.Password)
                users = append(users,user)
        }

        userBytes, _ := json.MarshalIndent(users,"","\t")

        w.Header().Set("Content-Type","application/json")
        w.Write(userBytes)

        defer rows.Close()
        defer con.Close()
}

func POSTHandler(w http.ResponseWriter,r *http.Request){
        con := db.ConnectDb()

        var u User
        err := json.NewDecoder(r.Body).Decode(&u)
        if err != nil {
                http.Error(w, err.Error(),http.StatusBadRequest)
                return
        }

        sqlStatement := `INSERT INTO users (name,password) VALUES ($1,$2) `
        _, err = con.Exec(sqlStatement,u.Name,u.Password)
        if err != nil {
                w.WriteHeader(http.StatusBadRequest)
                panic(err)
        }

        w.WriteHeader(http.StatusOK)
        defer con.Close()
}

func main(){
        http.HandleFunc("/",GETHandler)
        http.HandleFunc("/post", POSTHandler)
        log.Fatal(http.ListenAndServe(":8080",nil))
}




















//
