import React, { useState } from 'react';
import './App.css';
import Header from './Header'
import Sidebar from './Sidebar'
import Contents from './Contents'

interface Users{
  id: number,
  name: string
}

function getLoginUser(){
  const login_user:Users = {
    id:1,
    name:'testuser1'
  }
  return login_user
}

const App: React.FC = () =>  {
  const user = getLoginUser()
  const [projectId,setProjectId] =useState<number|null>(null)
  function handleProjectChange(project_id:number){
    setProjectId(project_id)
  }
  return (
    
    <div >
      <div className='col'>
        <div className='header'> <Header id={user.id} name={user.name}/> </div>
        <div className='row'>
          <div className='sidebar'><Sidebar user_id={user.id} user_name={user.name} handle_project_change={handleProjectChange}/> </div>
          <div className='contents'> <Contents project_id={projectId}/> </div>
        </div>
      </div>
    </div>
    
  );
}

export default App;
