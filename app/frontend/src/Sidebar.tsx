import React, { useState } from 'react';
import ProjectButton from './components/ProjectButton'

interface Projects{
  id: string,
  name: string,
  userid: string
}

const Sidebar: React.FC = () => {
  const [project,setProject] = useState<Projects|null>()

  interface Param  {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    mode: 'no-cors' | 'cors' | 'same-origin',
    credentials:'include' |  'same-origin' |'same-origin' |'omit'
  }
  const param:Param ={
    method:'GET', 
    mode:'cors',
    credentials:'include'
  }
  
  function fetchProjects(url:string,param:Param){
    const res = fetch(url,param).then(
      res => {
        if(res.status===200){
          console.log('ok',res.json())
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
