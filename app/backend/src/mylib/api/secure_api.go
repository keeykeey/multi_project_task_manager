package api

import(
        "mylib/db"
        "database/sql"
        "log"
)

func CountRows(rows *sql.Rows)(count int){
        for rows.Next(){
                err := rows.Scan(&count)
                if err != nil {
                        panic(err)
                }
        }
        return count
}

func CheckPidUid(pid int,uid int) int{
        /*     
        headerにて送られたproject id をpid、cookieにて送られたuser id をuidとすると、
        projectテーブル上にpidとuidを同時に含む行がなかった場合、
        送付されたpidとuidのどちらかは不正なので、処理を中断して一切のtaskを返さないようにするべき。
        */        
        var query ="SELECT COUNT(userid) FROM projects WHERE (id = $1) and (userid = $2);"

        con := db.ConnectDb()

        rows,err := con.Query(query,pid,uid)
        if err != nil{ 
                log.Fatal(err)
        }

        count := CountRows(rows)

        defer con.Close()

        if count != 1 {
                return 0;
        } else {
                return 1;
        }
}