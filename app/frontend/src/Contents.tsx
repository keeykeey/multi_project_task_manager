import React, {useState,useEffect} from 'react';
import './App.css' ;
import TaskCard from './components/TaskCard';

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
  },[props.project_id])

  const [tasks,setTasks] = useState<Tasks[]>([])

  const param:Param = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
    headers: {'projectid':String(props.project_id)}
  }

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

  return (
    <div className='contents'>
      <h3>{String(tasks[0])==='undefined' ? '' : 'Tasks'}</h3><hr/>
      {tasks.map(t=><div key={t.id}>
        <TaskCard id = {t.id}
                  text={t.name} 
                  deadline={t.deadline} 
                  taskpriority={t.taskpriority}/>
      </div>)}
    </div>
  );
}

export default Contents;
