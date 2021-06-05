package main

import (
        "log"
        "net/http"
        "mylib/db"
)

func main(){
        http.HandleFunc("/users",db.GetUsers)
        http.HandleFunc("/projects",db.GetProjects)
        http.HandleFunc("/tasks",db.GetTasks)
        http.HandleFunc("/post", db.POSTHandler)
        log.Fatal(http.ListenAndServe(":8080",nil))
}
