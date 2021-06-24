package main

import (
        "log"
        "net/http"
        "mylib/api"
)

func main(){
        http.HandleFunc("/users",api.GetUsers)
        http.HandleFunc("/projects",api.GetProjects)
        http.HandleFunc("/tasks",api.GetTasks)
        http.HandleFunc("/post", api.POSTHandler)
        log.Fatal(http.ListenAndServe(":8080",nil))
}
