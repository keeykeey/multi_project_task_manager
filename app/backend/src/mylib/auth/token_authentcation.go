package auth

import (
	"encoding/json"
	"time"
	"net/http"
	_ "github.com/lib/pq"
	"mylib/db"
)

func TokenAuthenteicate(w http.ResponseWriter, r *http.Request){
	/*
		POSTを受け取り認証が成功したら,
		１）　dbのtokensテーブルに1レコード追加しtoken情報を保存し、のちにstatefulな通信ができるようにする
		２）　HttpOnlyでcookieにtokenをつけて返す。
	*/
	con := db.ConnectDb()

	type Users struct {
		Name string
		Password string
	}

	var u Users
	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		http.Error(w, err.Error(),http.StatusBadRequest)
		return
	}

	var query1 = "SELECT id FROM users WHERE name = $1 AND password = $2;"

	uid, err := con.Query(query1,u.Name,u.Password)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		panic(err)
	}

	token := TokenGenerator(8)

	expire := time.Now().Add(2 * time.Minute)//2分で有効期限が切れるトークンにする

	var query2 = "INSERT INTO tokens(token,expire,userid) VALUES($1,$2,$3);"
	con.Exec(query2,token,expire,uid)

	c := &http.Cookie{
		Name: "token",
		Value: token,
		Expires: expire,
		HttpOnly: true,
	}

	http.SetCookie(w,c)
	w.WriteHeader(http.StatusOK)

	defer con.Close()
}