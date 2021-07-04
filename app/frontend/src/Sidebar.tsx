import React, { useState, useEffect} from 'react';
import ProjectButton from './components/ProjectButton'

interface Props{
  user_id: number;
  user_name: string;
  handle_project_change:Function;
}

interface Projects{
  id: number;
  name: string;
}

interface Param  {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  mode: 'no-cors' | 'cors' | 'same-origin',
  credentials: 'include' | 'same-origin' | 'same-origin' | 'omit',
  headers: {'uid':string}
}

const Sidebar: React.FC<Props> = (props) => {
  useEffect(()=>{
    fetchProjects(url,param)// eslint-disable-next-line react-hooks/exhaustive-deps
  },[props.user_id])

  const [projects,setProjects] = useState<Projects[]>([])

  const param:Param = {
    method:'GET', 
    mode:'cors',
    credentials:'include',
    headers:{'uid':String(props.user_id)}
  }

  const url: string = 'http://127.0.0.1:8080/projects'
  
  function fetchProjects(url:string,param:Param){
    var project_array:Projects[] = []
    
    fetch(url,param)
    .then(res=>res.json())
    .then(json => {
      for (var i:number=0 ; i<json.length ; i++){
        var p:Projects={
          id : json[i].Id,
          name: json[i].Name
        }
        project_array.push(p)
      }
    }).then(res=>setProjects(project_array))
  }

  return (
    <div className='sidebar'>
      {projects.map(p=><div key={p.id}>
        <ProjectButton project_id={p.id} project_name={p.name} handle_project_change={props.handle_project_change}/>
      </div>)}
    </div>
    
  );

}

export default Sidebar;
