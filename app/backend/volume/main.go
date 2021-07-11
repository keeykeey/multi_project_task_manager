package main

import (
        "log"
        "net/http"
        "mylib/api"
        "mylib/auth"
)

func main(){
        http.HandleFunc("/users",api.GetUsers)
        http.HandleFunc("/projects",api.GetProjects)
        http.HandleFunc("/tasks",api.GetTasks)
        http.HandleFunc("/puttasks", api.PutTasks)
        http.HandleFunc("/deletetasks",api.DeleteTasks)
        http.HandleFunc("/auth",auth.TokenAuthenteicate)
        log.Fatal(http.ListenAndServe(":8080",nil))
}
