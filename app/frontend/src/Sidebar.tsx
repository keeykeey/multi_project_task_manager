import React, { useState, useEffect} from 'react';
import ProjectButton from './components/ProjectButton'
import CreateProjectsButton from './components/CreateProjectsButton'

interface Props{
  windowHeight:number
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
}

const Sidebar: React.FC<Props> = (props) => {
  /*
      useEffect
  */
  useEffect(()=>{
    fetchProjects(url,param)// eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const [projects,setProjects] = useState<Projects[]>([])

  const param:Param = {
    method:'GET', 
    mode:'cors',
    credentials:'include',
  }

  const url: string = 'http://127.0.0.1:8080/projects'
  
  function fetchProjects(url:string,param:Param){
    var project_array:Projects[] = []
    
    fetch(url,param)
    .then(res=>res.json())
    .then(json => {
      if (!json){
        return 0;
      }
      for (var i:number=0 ; i<json.length ; i++){
        var p:Projects={
          id : json[i].Id,
          name: json[i].Name
        }
        project_array.push(p)
      }
    }).then(res=>setProjects(project_array))
  }

  function refetchProjects(){
    /*
      TaskCardにpropsとして渡す。
      TaskCardのeditが成功した時に、この関数が実行され、ユーザーの操作なしで編集内容が反映される。
      useEffect経由で変更を反映させるべきかとも思ったが、その場合処理が回りくどい気がする。
    */
    fetchProjects(url,param)
  }
  
  /*
      COMPONENT
  */
  const btnHeight : number = 40 //「サイドバーのボタンの縦の長さ×プロジェクト数の値」と「windowサイズの縦の0.65倍の値」との大小比較により、
  　　　　　　　　　　　　　　　　　　//プロジェクト新規追加ボタンを、画面上にも表示するようにする。
  return (
    <div>
      {(props.windowHeight*0.65) < (projects.length*btnHeight)?<CreateProjectsButton refetch_projects={refetchProjects}/>:''}
      {projects.map(p=><div key={p.id}>
        <ProjectButton project_id={p.id} project_name={p.name} handle_project_change={props.handle_project_change} refetch_projects={refetchProjects}/>
      </div>)}
      <CreateProjectsButton refetch_projects={refetchProjects}/>
    </div>
    
  );

}

export default Sidebar;
