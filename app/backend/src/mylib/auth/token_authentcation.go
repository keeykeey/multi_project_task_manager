package auth

import (
	"fmt"
	"strconv"
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
	/*
		cors対策に、各種設定。
		https://developer.mozilla.org/ja/docs/Web/HTTP/CORS
	　　 から色々調べる。Access-Control-Allow-Headersにr.Header.Get("Access-Control-Request-Headers"を設置するあたり、もう少し理解深めたい。
		どうやら単純リクエストではなく、プリフライトリクエストとなっているようで、Origin,Method,Headersを設定しなくてはいけないよう。
		Credentialsは、front側でcredentialsを'include'に設定しているため、backend側で’Credentials:true'にしてあげなくてはいけない。
	*/
	w.Header().Set("Access-Control-Allow-Origin","http://127.0.0.1:3000")
	w.Header().Set("Access-Control-Allow-Methods","POST")
	w.Header().Set("Access-Control-Allow-Credentials","true")
	headers := r.Header.Get("Access-Control-Request-Headers")
	w.Header().Set("Access-Control-Allow-Headers",headers)

	con := db.ConnectDb()

	/*
		username と password でuserテーブルからidを含むレコードを取得するために、インターフェース（requestのjsonとsqlクエリで使う語との）を定義
	*/	
	type Users struct {
		Name string
		Password string
	}

	var u Users
	
	err := json.NewDecoder(r.Body).Decode(&u)

	if err != nil {
		//http.Error(w, err.Error(),http.StatusBadRequest)
		w.WriteHeader(http.StatusOK)
		//panic(err)
		fmt.Fprintf(w,"display error...\n" + err.Error())
		return
	}//エラーハンドリングをもう少し練りたいところ。フロント側で、status-codeの値に応じて処理を分岐したいので、エラーの時には返すstatus-codeを指定したい。
	 //どうやら、json.NewDecoder(r.Body).Decode(&u)	でusernameとpasswordが正しく格納されても、errorを返してしまうようだ。
	 //（ユーザーが正しい入力をした時に例外処理に入ってしまう）
	
	var query1 = "SELECT id FROM users WHERE name = $1 AND password = $2"
	rows := con.QueryRow(query1,u.Name,u.Password)

	/*
		username と password でuserテーブルからidを含むレコードを取得したので、
		レコードからidを取り出すためにインターフェース（と言ってもただのint型変数）を定義
	*/
	var uid int
	rows.Scan(&uid)

	token := TokenGenerator(8)
	expire := time.Now().Add(2 * time.Minute)//2分で有効期限が切れるトークンにする
	c := &http.Cookie{
		Name: "token",
		Value: token,
		Expires: expire,
		HttpOnly: true,
	}

	var query2 = "INSERT INTO tokens(token,expire,userid) VALUES($1,$2,$3)"
	con.Exec(query2,token,expire,uid)

	http.SetCookie(w,c)

	fmt.Fprintf(w,strconv.Itoa(uid))

	defer con.Close()
}
