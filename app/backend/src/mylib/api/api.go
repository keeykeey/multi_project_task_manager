package api

import (
        "encoding/json"
        "log"
        "net/http"
        _ "github.com/lib/pq"
        "strconv"
        "mylib/db"
        "fmt"
        "mylib/auth"
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
        w.Header().Set("Access-Control_Allow-Methods","GET")
        w.Header().Set("Access-Control-Allow-Origin","http://127.0.0.1:3000")
        w.Header().Set("Access-Control-Allow-Credentials","true")
        w.WriteHeader(http.StatusOK)
        w.Write(json_response)

}

func PostUsers(w http.ResponseWriter, r *http.Request){
        w.Header().Set("Access-Control-Allow-Origin","http://127.0.0.1:3000")
        w.Header().Set("Access-Control-Allow-Methods","POST")
        w.Header().Set("Access-Control-Allow-Credentials","true")
        headers := r.Header.Get("Access-Control-Request-Headers")
        w.Header().Set("Access-Control-Allow-Headers",headers)

        type User struct {
                Name string
                Password string
                Email string
        }
        var u User        
        err := json.NewDecoder(r.Body).Decode(&u)
        if err != nil {
                w.WriteHeader(http.StatusOK)
                fmt.Fprintf(w,"err")
                fmt.Print(w,u.Name + "...")
                return
        }//本当はエラーハンドリングをしっかりとやるために、Badrequestを返したい。

        con := db.ConnectDb()

        var query string = "INSERT INTO users(name,password,email) VALUES($1,$2,$3)"
        con.Exec(query,u.Name,u.Password,u.Email)

        fmt.Print(w,u.Name)

        defer con.Close()
}

func DeleteUsers(w http.ResponseWriter, r *http.Request){
        w.Header().Set("Access-Control-Allow-Origin","http://127.0.0.1:3000")
        w.Header().Set("Access-Control-Allow-Methods","DELETE")
        w.Header().Set("Access-Control-Allow-Credentials","true")
        headers := r.Header.Get("Access-Control-Allow-Headers")
        w.Header().Set("Access_Control-Allow-Headers",headers)

        var uid int = auth.ListenAuthState(w,r)
        var query string = "DELETE FROM users WHERE id = $1"

        con := db.ConnectDb()
        con.Exec(query,uid)

        defer con.Close()
}

func GetUserName(w http.ResponseWriter,r *http.Request){
        w.Header().Set("Content-Type","text/html")
        w.Header().Set("Access-Control_Allow-Methods","GET")
        w.Header().Set("Access-Control-Allow-Origin","http://127.0.0.1:3000")
        w.Header().Set("Access-Control-Allow-Credentials","true")

        con := db.ConnectDb()
        var uid int = auth.ListenAuthState(w,r)
        var query string = "SELECT name from users WHERE id = $1"
        rows,err1 := con.Query(query,uid)
        if err1 != nil {
                panic(err1)
        }

        var name string;
        for rows.Next(){
                err2 := rows.Scan(&name)
                if err2 != nil {
                        panic(err2)
                }
        }

        defer rows.Close()
        defer con.Close()
        w.WriteHeader(http.StatusOK)
        fmt.Fprintf(w,name)
}

func PutUserName(w http.ResponseWriter, r *http.Request){
        w.Header().Set("Access-Control-Allow-Origin","http://127.0.0.1:3000")
        w.Header().Set("Access-Control-Allow-Methods","PUT")
        w.Header().Set("Access-Control-Allow-Credentials","true")
        headers := r.Header.Get("Access-Control-Request-Headers")
        w.Header().Set("Access-Control-Allow-Headers",headers)

        con := db.ConnectDb()

        var uid int
        uid = auth.ListenAuthState(w,r)

        type Users struct {
                Name string
        }

        var u Users
        err := json.NewDecoder(r.Body).Decode(&u)
        if err != nil {
                w.WriteHeader(http.StatusOK)
                fmt.Fprintf(w,"ERROR : " + err.Error())
                return
        }//エラーハンドリングはもう少し練りたいところ。フロント側で、status-codeに応じてちゃんとエラー処理を分岐できるか。

        var query = "UPDATE users SET name=$1 WHERE id=$2"
        con.Exec(query,u.Name,uid)

        w.WriteHeader(http.StatusOK)

        defer con.Close()
}

func PutUsersEmail(w http.ResponseWriter, r *http.Request){
        w.Header().Set("Access-Control-Allow-Origin","http://127.0.0.1:3000")
        w.Header().Set("Access-Control-Allow-Methods","PUT")
        w.Header().Set("Access-Control-Allow-Credentials","true")
        headers := r.Header.Get("Access-Control-Request-Headers")
        w.Header().Set("Access-Control-Allow-Headers",headers)

        con := db.ConnectDb()

        var uid int
        uid = auth.ListenAuthState(w,r)

        type Users struct {
                Email string
        }

        var u Users
        err := json.NewDecoder(r.Body).Decode(&u)
        if err != nil {
                w.WriteHeader(http.StatusOK)
                fmt.Fprintf(w,"ERROR : " + err.Error())
                return
        }//エラーハンドリングはもう少し練りたいところ。フロント側で、status-codeに応じてちゃんとエラー処理を分岐できるか。

        var query = "UPDATE users SET email=$1 WHERE id=$2"
        con.Exec(query,u.Email,uid)

        w.WriteHeader(http.StatusOK)

        defer con.Close()
}

func GetProjects(w http.ResponseWriter,r *http.Request){
        con := db.ConnectDb()
        
        var uid int
        uid = auth.ListenAuthState(w,r)
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
        w.Header().Set("Access-Control_Allow-Methods","GET")
        w.Header().Set("Access-Control-Allow-Origin","http://127.0.0.1:3000")
        w.Header().Set("Access-Control-Allow-Credentials","true")
        w.WriteHeader(http.StatusOK)
        w.Write(json_response)
}

func GetProjectName(w http.ResponseWriter,r *http.Request){
        w.Header().Set("Content-Type","text/html")
        w.Header().Set("Access-Control_Allow-Methods","GET")
        w.Header().Set("Access-Control-Allow-Origin","http://127.0.0.1:3000")
        w.Header().Set("Access-Control-Allow-Credentials","true")
        w.Header().Set("Access-Control-Allow-Headers","projectid")

        var pid int
        s := r.Header.Get("projectid")
        pid,_ = strconv.Atoi(s)
        var query string = "SELECT name from projects WHERE id = $1"

        con := db.ConnectDb()
        rows,err1 := con.Query(query,pid)
        if err1 != nil {
                panic(err1)
        }

        var name string;
        for rows.Next(){
                err2 := rows.Scan(&name)
                if err2 != nil {
                        panic(err2)
                }
        }

        defer rows.Close()
        defer con.Close()
        w.WriteHeader(http.StatusOK)
        fmt.Fprintf(w,name)
}

func PostProjects(w http.ResponseWriter, r *http.Request){
        w.Header().Set("Access-Control-Allow-Origin","http://127.0.0.1:3000")
        w.Header().Set("Access-Control-Allow-Methods","POST")
        w.Header().Set("Access-Control-Allow-Credentials","true")
        headers := r.Header.Get("Access-Control-Request-Headers")
        w.Header().Set("Access-Control-Allow-Headers",headers)

        var uid int = auth.ListenAuthState(w,r)
        type Projects struct {
                Name string
        }
        
        var p Projects
        
        err := json.NewDecoder(r.Body).Decode(&p)
        if err != nil {
                w.WriteHeader(http.StatusOK)
                fmt.Fprintf(w,"err")
                fmt.Print(w,p.Name)
                return
        }

        con := db.ConnectDb()

        var query string = "INSERT INTO projects(name,userid) VALUES($1,$2)"
        con.Exec(query,p.Name,uid)

        fmt.Print(w,p.Name)
        fmt.Fprintf(w,strconv.Itoa(uid))

        defer con.Close()
}

func PutProjects(w http.ResponseWriter, r *http.Request){
        w.Header().Set("Access-Control-Allow-Origin","http://127.0.0.1:3000")
        w.Header().Set("Access-Control-Allow-Methods","PUT")
        w.Header().Set("Access-Control-Allow-Credentials","true")
        headers := r.Header.Get("Access-Control-Request-Headers")
        w.Header().Set("Access-Control-Allow-Headers",headers)

        con := db.ConnectDb()

        type Projects struct {
                Id int
                Name string
        }

        var p Projects

        err := json.NewDecoder(r.Body).Decode(&p)
        if err != nil {
                w.WriteHeader(http.StatusOK)
                fmt.Fprintf(w,"ERROR : " + err.Error())
        }//エラーハンドリングはもう少し練りたいところ。フロント側で、status-codeに応じてちゃんとエラー処理を分岐できるか。

        var query = "UPDATE projects SET name=$1 WHERE id=$2"
        con.Exec(query,p.Name,p.Id)

        w.WriteHeader(http.StatusOK)

        defer con.Close()

}

func DeleteProjects(w http.ResponseWriter, r *http.Request){
        w.Header().Set("Access-Control-Allow-Origin","http://127.0.0.1:3000")
        w.Header().Set("Access-Control-Allow-Methods","DELETE")
        w.Header().Set("Access-Control-Allow-Credentials","true")
        headers := r.Header.Get("Access-Control-Request-Headers")
        w.Header().Set("Access-Control-Allow-Headers",headers)

        var projectid int
        var s = r.Header.Get("projectid")
        projectid, _ = strconv.Atoi(s)

        con := db.ConnectDb()

        var query = "DELETE FROM projects WHERE id=$1"
        con.Exec(query,projectid)

        defer con.Close()
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
        w.Header().Set("Access-Control_Allow-Methods","GET")
        w.Header().Set("Access-Control-Allow-Origin","http://127.0.0.1:3000")
        w.Header().Set("Access-Control-Allow-Credentials","true")
        w.WriteHeader(http.StatusOK)
        w.Write(json_response)
}

func PostTasks(w http.ResponseWriter,r *http.Request){
        w.Header().Set("Access-Control-Allow-Origin","http://127.0.0.1:3000")
        w.Header().Set("Access-Control-Allow-Methods","POST")
        w.Header().Set("Access-Control-Allow-Credentials","true")
        headers := r.Header.Get("Access-Control-Request-Headers")
        w.Header().Set("Access-Control-Allow-Headers",headers)

        con := db.ConnectDb()

        type Tasks struct {
                Name string
                Projectid int
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

        var query = "INSERT INTO tasks(name,projectid,deadline,taskpriority) VALUES($1,$2,$3,$4)"
        con.Exec(query,t.Name,t.Projectid,t.Deadline,t.Taskpriority)

        defer con.Close()
}

func PutTasks(w http.ResponseWriter,r *http.Request){
        w.Header().Set("Access-Control-Allow-Origin","http://127.0.0.1:3000")
        w.Header().Set("Access-Control-Allow-Methods","PUT")//本当は”PUT"にすべきかもしれないが、ここではrequestのbodyを受け取ってsqlで使えればいいので、POSTでも可とする。
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

        defer con.Close()
}

func DeleteTasks(w http.ResponseWriter, r *http.Request){
        w.Header().Set("Access-Control-Allow-Origin","http://127.0.0.1:3000")
        w.Header().Set("Access-Control-Allow-Methods","DELETE")
        w.Header().Set("Access-Control-Allow-Credentials","true")
        headers := r.Header.Get("Access-Control-Request-Headers")
        w.Header().Set("Access-Control-Allow-Headers",headers)

        var taskid int
        var s = r.Header.Get("taskid") //this returns type string. if you want to get s as type []string, use r.Header["taskid"] instead.
        taskid, _ = strconv.Atoi(s)

        con := db.ConnectDb()
        
        var query = "DELETE FROM tasks WHERE id = $1"
        con.Exec(query,taskid)

        defer con.Close()
}
