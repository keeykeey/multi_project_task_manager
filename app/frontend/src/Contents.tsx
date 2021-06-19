import React, {useState,useEffect} from 'react';
import TaskCard from './components/TaskCard'

interface Props{
  project_id:number|null;
}

interface Users {
  id: number;
  name:string;
}

interface Tasks {
  id: number;
  name: string;
}

interface Param  {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  mode: 'no-cors' | 'cors' | 'same-origin',
  credentials: 'include' | 'same-origin' | 'same-origin' | 'omit',
  headers: {'projectid':string}
}

function Contents(props:Props){
  useEffect(()=>{
    fetchTasks(url,param)
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
    var tasks_array:Tasks[] = new Array()

    fetch(url,param)
    .then(res=>res.json())
    .then(json=>{
      //画面ロード時に、jsonがnullになるので、下のjson.lengthの部分でエラーを吐かないように
      if(!json){return 0}
      console.log('see inseide json',json)
      for (var i:number=0 ; i<json.length ; i++){
        var t:Tasks={
          id: json[i].Id,
          name: json[i].Name
        }
        tasks_array.push(t)
      }
    }).then(res=>setTasks(tasks_array))
  }

  return (
    <div >
      {tasks.map(t=><div key={t.id}>
        <TaskCard text={t.name}/>
      </div>)}
    </div>
  );
}

export default Contents;
