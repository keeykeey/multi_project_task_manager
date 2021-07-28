package main

import (
        "log"
        "net/http"
        "mylib/api"
        "mylib/auth"
)

func main(){
        http.HandleFunc("/users",api.GetUsers)

        http.HandleFunc("/auth",auth.GiveAuthToken)
        http.HandleFunc("/logout",auth.RemoveToken)
        http.HandleFunc("/getusername",api.GetUserName)
        
        http.HandleFunc("/putusers",api.PutUserName)

        http.HandleFunc("/projects",api.GetProjects)
        http.HandleFunc("/getprojectname",api.GetProjectName)
        http.HandleFunc("/postprojects",api.PostProjects)
        http.HandleFunc("/putprojects",api.PutProjects)
        http.HandleFunc("/deleteprojects",api.DeleteProjects)

        http.HandleFunc("/tasks",api.GetTasks)
        http.HandleFunc("/posttasks",api.PostTasks)
        http.HandleFunc("/puttasks", api.PutTasks)
        http.HandleFunc("/deletetasks",api.DeleteTasks)
        log.Fatal(http.ListenAndServe(":8080",nil))
}
