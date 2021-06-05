package db

import (
        "encoding/json"
        "log"
        "database/sql"
        "fmt"
        "net/http"
        _ "github.com/lib/pq"
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

func GetUsers(w http.ResponseWriter,r *http.Request){
        con := ConnectDb()

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

func GetProjects(w http.ResponseWriter,r *http.Request){
        con := ConnectDb()

        rows,err := con.Query("SELECT * FROM projects;")
        if err != nil {
                log.Fatal(err)
        }

        type Projects struct {
                Id string
                Name string
        }

        var list [] Projects

        for rows.Next(){
                var project Projects
                er := rows.Scan(&project.Id,&project.Name)
                if er != nil {
                        panic(er)
                }
                list = append(list,project)
        }

        json_response, _ := json.MarshalIndent(list,"","\t")

        w.Header().Set("Content-Type","application/json")
        w.Write(json_response)

        defer rows.Close()
        defer con.Close()
}

func GetTasks(w http.ResponseWriter,r *http.Request){
        con := ConnectDb()

        rows,err := con.Query("SELECT * FROM tasks;")
        if err != nil {
                log.Fatal(err)
        }

        type Tasks struct {
                Id string
                Name string
        }

        var list [] Tasks

        for rows.Next(){
                var task Tasks
                er := rows.Scan(&task.Id,&task.Name)
                if er != nil {
                        panic(er)
                }
                list = append(list,task)
        }

        json_response, _ := json.MarshalIndent(list,"","\t")

        w.Header().Set("Content-Type","application/json")
        w.Write(json_response)

        defer rows.Close()
        defer con.Close()
}

func POSTHandler(w http.ResponseWriter,r *http.Request){
        con := ConnectDb()

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
