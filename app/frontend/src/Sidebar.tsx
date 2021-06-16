import React, { useState, useEffect} from 'react';
import ProjectButton from './components/ProjectButton'

interface Users{
  id: number;
  name: string;
}

interface Projects{
 name: string;
}

interface Param  {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  mode: 'no-cors' | 'cors' | 'same-origin',
  credentials: 'include' | 'same-origin' | 'same-origin' | 'omit',
  headers: {'uid':string}
}

const Sidebar: React.FC<Users> = (props) => {
  /*const [project,setProject] = useState<Projects|null>()*/
  //現状anyを指定しないと、setProject(res.json())した時に、型エラーにより失敗する。anyではなくProjectsを指定した実装にしたい。要改良。
  const [projects,setProjects] = useState<any>([])

  const p:Projects ={
    name:'namae'
  }
  
  const param:Param ={
    method:'GET', 
    mode:'cors',
    credentials:'include',
    headers:{'uid':String(props.id)}
  }

  const url: string = 'http://127.0.0.1:8080/projects'
  
  async function fetchProjects(url:string,param:Param){
    const res = await fetch(url,param).then(
      res => {
        if(res.status===200){
          setProjects(res.json())
        }else if(res.status!==200){
        }
      }
    ).then(res=>console.log('projects',projects))
  }
  
  /*
  return (
    <div >
      <ProjectButton name='count_infected'/><br/>
      <ProjectButton name='task_manager'/><br/>
      <ProjectButton name='song_editor'/><br/>
      <ProjectButton name='create api wih golang'/><br/>
      <button onClick={()=>fetchProjects(url,param)}>run fetchProjects function</button>
    </div>
    
  );
  */

  useEffect(()=>{
    fetchProjects(url,param)
  },[])

  return(
    <div>
        {projects[0]}
    </div>

)


}

export default Sidebar;
