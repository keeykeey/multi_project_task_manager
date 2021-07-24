import React, {useState,useEffect} from 'react';
import './App.css' ;
import TaskCard from './components/TaskCard';
import CreateTasksButton from './components/CreateTasksButton'

interface Props{
  project_id:number|null;
}

interface Tasks {
  id: number;
  name: string;
  deadline: string;//日付の差を計算するときは文字列をnew Data()に渡す。
  taskpriority: number;
}

interface Param  {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  mode: 'no-cors' | 'cors' | 'same-origin',
  credentials: 'include' | 'same-origin' | 'same-origin' | 'omit',
  headers: {'projectid':string}
}

function Contents(props:Props){
  useEffect(()=>{
    fetchTasks(url,param)// eslint-disable-next-line react-hooks/exhaustive-deps
    fetchProjectName()
    console.log('contents useeffect')
  },[props.project_id])

  const param:Param = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: {'projectid':String(props.project_id)}
  }

  const [tasks,setTasks] = useState<Tasks[]>([])

  const url: string = 'http://127.0.0.1:8080/tasks'

  function fetchTasks(url:string,param:Param){
    var tasks_array:Tasks[] = []

    fetch(url,param)
    .then(res=>res.json())
    .then(json=>{
      //画面ロード時に、jsonがnullになるので、下のjson.lengthの部分でエラーを吐かないように
      if(!json){return 0}
      for (var i:number=0 ; i<json.length ; i++){
        var t:Tasks={
          id: json[i].Id,
          name: json[i].Name,
          deadline: json[i].Deadline,
          taskpriority: json[i].Taskpriority
        }
        tasks_array.push(t)
      }
    }).then(res=>setTasks(tasks_array))
  }

  const [pname,setPname] = useState<string>('')
  function fetchProjectName(){
    const param:Param = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers:{'projectid':String(props.project_id)}
    }  
    const url:string = 'http://127.0.0.1:8080/getprojectname'

    fetch(url,param)
    .then(res=>res.text())
    .then(text=>setPname(text))
    .catch(err=>console.log('failed...',err))
  }

  function editInfoTrigger(){
    /*
      TaskCardにpropsとして渡す。
      TaskCardのeditが成功した時に、この関数が実行され、ユーザーの操作なしで編集内容が反映される。
      useEffect経由で変更を反映させるべきかとも思ったが、その場合処理が回りくどい気がする。
    */
    fetchTasks(url,param)
  }

  return (
    <div className='contents'>
      <h3 className='rows'>
        {pname+'のタスク'}
        <CreateTasksButton userid={1} projectid={props.project_id} editInfoTrigger={editInfoTrigger}/>
      </h3><hr/>
      {tasks.map(t=><div key={t.id}>
        <TaskCard id = {t.id}
                  text={t.name} 
                  deadline={t.deadline} 
                  taskpriority={t.taskpriority}
                  editInfoTrigger={editInfoTrigger}/>
      </div>)}
    </div>
  );
}

export default Contents;
