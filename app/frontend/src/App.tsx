import React from 'react';
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
  return (
    <div >
      <div className='col'></div>
        <div className='header'> <Header id={user.id} name={user.name}/> </div>
        <div className='row'>
          <div className='sidebar'><Sidebar id={user.id} name={user.name}/> </div>
          <div className='contents'> <Contents/> </div>
        </div>
    </div>
  );
}

export default App;
