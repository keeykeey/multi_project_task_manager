package db

import (
        "encoding/json"
        "log"
        "database/sql"
        "fmt"
        "net/http"
        _ "github.com/lib/pq"
        "strconv"
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
                var u Users
                err := rows.Scan(&u.Id,&u.Name,&u.Password)
                if err != nil {
                        panic(err)
                }
                list = append(list,u)
        }

        defer rows.Close()
        defer con.Close()

        json_response, _ := json.MarshalIndent(list,"","\t")

        w.Header().Set("Content-Type","application/json")
        w.Header().Set("Access-Control-Allow-Headers","uid")
        w.Header().Set("Access-Control_Allow-Method","GET")
        w.Header().Set("Access-Control-Allow-Origin","http://127.0.0.1:3000")
        w.Header().Set("Access-Control-Allow-Credentials","true")
        w.WriteHeader(http.StatusOK)
        w.Write(json_response)

}

func GetProjects(w http.ResponseWriter,r *http.Request){
        con := ConnectDb()
        
        var uid int
        var s = r.Header.Get("uid") //this returns type string. if you want to get s as type []string, use r.Header["uid"] instead.
        uid, _ = strconv.Atoi(s)
        var query = "SELECT name FROM projects WHERE userid = $1"// ORDER BY id ASC"

        rows,err := con.Query(query,uid)
        if err != nil {
                log.Fatal(err)
        }

        type Projects struct {
                Name string
        }

        var list [] Projects

        for rows.Next(){
                var p Projects
                err := rows.Scan(&p.Name)
                if err != nil {
                        panic(err)
                }
                list = append(list,p)
        }

        defer rows.Close()
        defer con.Close()

        json_response, _ := json.MarshalIndent(list,"","\t")

        w.Header().Set("Content-Type","application/json")
        w.Header().Set("Access-Control-Allow-Headers","uid")
        w.Header().Set("Access-Control_Allow-Method","GET")
        w.Header().Set("Access-Control-Allow-Origin","http://127.0.0.1:3000")
        w.Header().Set("Access-Control-Allow-Credentials","true")
        w.WriteHeader(http.StatusOK)
        w.Write(json_response)
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
                Projectid string
        }

        var list [] Tasks

        for rows.Next(){
                var t Tasks
                err := rows.Scan(&t.Id,&t.Name,&t.Projectid)
                if err != nil {
                        panic(err)
                }
                list = append(list,t)
        }

        defer rows.Close()
        defer con.Close()

        json_response, _ := json.MarshalIndent(list,"","\t")

        w.Header().Set("Content-Type","application/json")
        w.Header().Set("Access-Control-Allow-Headers","pid")
        w.Header().Set("Access-Control_Allow-Method","GET")
        w.Header().Set("Access-Control-Allow-Origin","http://127.0.0.1:3000")
        w.Header().Set("Access-Control-Allow-Credentials","true")
        w.WriteHeader(http.StatusOK)
        w.Write(json_response)
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
