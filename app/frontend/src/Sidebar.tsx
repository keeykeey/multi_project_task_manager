import { RSA_PKCS1_PSS_PADDING } from 'constants';
import React, { useState, useEffect} from 'react';
import ProjectButton from './components/ProjectButton'

interface Users{
  id: number;
  name: string;
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

const Sidebar: React.FC<Users> = (props) => {
  useEffect(()=>{
    fetchProjects(url,param)
  },[props.id])

  const [projects,setProjects] = useState<Projects[]>([])

  const param:Param ={
    method:'GET', 
    mode:'cors',
    credentials:'include',
    headers:{'uid':String(props.id)}
  }

  const url: string = 'http://127.0.0.1:8080/projects'
  
  function fetchProjects(url:string,param:Param){
    let project_array:Projects[] = new Array()
    
    fetch(url,param)
    .then(res=>res.json())
    .then(json => {
      console.log('see inside',json)      
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
    <div>
      {projects.map(p=><div key={p.id}><ProjectButton name={p.name}/></div>)}
    </div>
    
  );

}

export default Sidebar;
