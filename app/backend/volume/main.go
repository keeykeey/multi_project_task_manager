package main

import (
        "encoding/json"
        "log"
        "fmt"
        "net/http"
        _ "github.com/lib/pq"
        "mylib/db"
)

func GETHandler(w http.ResponseWriter,r *http.Request){
        con := db.ConnectDb()

        rows,err := con.Query("SELECT * FROM users;")
        if err != nil {
                log.Fatal(err)
        }

        type Users struct {
                Id string
                Name string
                Password string
        }

        var list [] Users

        for rows.Next(){
                var user Users
                er := rows.Scan(&user.Id,&user.Name,&user.Password)
                if er != nil {
                        panic(er)
                }
                list = append(list,user)
        }

        json_response, _ := json.MarshalIndent(list,"","\t")

        w.Header().Set("Content-Type","application/json")
        w.Write(json_response)

        defer rows.Close()
        defer con.Close()
}

func POSTHandler(w http.ResponseWriter,r *http.Request){
        con := db.ConnectDb()

        type Users struct {
                Id string
                Name string
                Password string
        }

        var u Users
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
