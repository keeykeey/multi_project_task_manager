package api

import (
        "encoding/json"
        "log"
        "net/http"
        _ "github.com/lib/pq"
        "strconv"
        "mylib/db"
        "fmt"
)

func GetUsers(w http.ResponseWriter,r *http.Request){
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
        con := db.ConnectDb()
        
        var uid int
        var s = r.Header.Get("uid") //this returns type string. if you want to get s as type []string, use r.Header["uid"] instead.
        uid, _ = strconv.Atoi(s)
        var query = "SELECT id,name FROM projects WHERE userid = $1"// ORDER BY id ASC"

        rows,err := con.Query(query,uid)
        if err != nil {
                log.Fatal(err)
        }

        type Projects struct {
                Id int
                Name string
        }

        var list [] Projects

        for rows.Next(){
                var p Projects
                err := rows.Scan(&p.Id,&p.Name)
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
        con := db.ConnectDb()
        
        var projectid int
        var s = r.Header.Get("projectid")
        projectid, _ = strconv.Atoi(s)
        var query = "SELECT id,name,deadline,taskpriority FROM tasks WHERE projectid = $1"

        rows,err := con.Query(query,projectid)
        if err != nil {
                log.Fatal(err)
        }

        type Tasks struct {
                Id string
                Name string
                Deadline string
                Taskpriority int
        }

        var list [] Tasks

        for rows.Next(){
                var t Tasks
                err := rows.Scan(&t.Id,&t.Name,&t.Deadline,&t.Taskpriority)
                if err != nil {
                        panic(err)
                }
                list = append(list,t)
        }

        defer rows.Close()
        defer con.Close()

        json_response, _ := json.MarshalIndent(list,"","\t")

        w.Header().Set("Content-Type","application/json")
        w.Header().Set("Access-Control-Allow-Headers","projectid")
        w.Header().Set("Access-Control_Allow-Method","GET")
        w.Header().Set("Access-Control-Allow-Origin","http://127.0.0.1:3000")
        w.Header().Set("Access-Control-Allow-Credentials","true")
        w.WriteHeader(http.StatusOK)
        w.Write(json_response)
}

func PostTasks(w http.ResponseWriter,r *http.Request){
        w.Header().Set("Access-Control-Allow-Origin","http://127.0.0.1:3000")
        w.Header().Set("Access-Control-Allow-Method","POST")
        w.Header().Set("Access-Control-Allow-Credentials","true")
        headers := r.Header.Get("Access-Control-Request-Headers")
        w.Header().Set("Access-Control-Allow-Headers",headers)

        con := db.ConnectDb()

        type Tasks struct {
                Id int
                Name string
                Deadline string
                Taskpriority int
        }//frontendから投げられるrequest.bodyのjsonのキーは、大文字小文字の違いは気にしなくてもいいが、上記Tasksのキーと同じにしないと下でjson.NewDecoder()の時にエラーとなる。
         //例えば、TasksでNameと定義しているのに、frontendのrequest.bodyからtask_nameというキーで値を投げても、デコードできない。

        var t Tasks

        err := json.NewDecoder(r.Body).Decode(&t)

        if err != nil {
                w.WriteHeader(http.StatusOK)
                fmt.Fprintf(w,"ERROR : " + err.Error())
                return
        }//エラーハンドリングをもう少し練りたいところ。フロント側で、status-codeの値に応じて処理を分岐したいので、エラーの時には返すstatus-codeを指定したい。

        var query = "UPDATE tasks SET name=$1, deadline=$2, taskpriority=$3 WHERE id=$4"
        con.Exec(query,t.Name,t.Deadline,t.Taskpriority,t.Id)
        //con.Exec("UPDATE tasks SET name=sample name, deadline=$1,taskpriority=1 WHERE id=$2",t.Deadline,t.Id)

        //fmt.Fprintf(w,t.Name+t.Deadline+t.Taskpriority+t.Id)

        defer con.Close()
}
