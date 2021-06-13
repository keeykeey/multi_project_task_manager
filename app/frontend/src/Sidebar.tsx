import React, { useState } from 'react';
import ProjectButton from './components/ProjectButton'

interface Users{
  id: number
  name: string
}

interface Projects{
  id: number,
  name: string,
  userid: number
}

interface Param  {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  mode: 'no-cors' | 'cors' | 'same-origin',
  credentials: 'include' | 'same-origin' | 'same-origin' | 'omit',
  headers: {'uid':string}
}

const Sidebar: React.FC<Users> = (props) => {
  const [project,setProject] = useState<Projects|null>()

  const param:Param ={
    method:'GET', 
    mode:'cors',
    credentials:'include',
    headers:{'uid':'2'}
  }
  
  function fetchProjects(url:string,param:Param){
    const res = fetch(url,param).then(
      res => {
        if(res.status===200){
          console.log(res.json())
        }else if(res.status!==200){
          console.log('failed',res)
        }
      }
    )
  }
  
  const url: string = 'http://127.0.0.1:8080/projects'

  return (
    <div >
      <ProjectButton name='count_infected'/><br/>
      <ProjectButton name='task_manager'/><br/>
      <ProjectButton name='song_editor'/><br/>
      <ProjectButton name='create api wih golang'/><br/>
      <button onClick={()=>fetchProjects(url,param)}>run fetchProjects function</button>
    </div>
  );
}

export default Sidebar;
