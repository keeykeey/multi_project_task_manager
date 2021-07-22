import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './Login'
import Header from './Header'
import Sidebar from './Sidebar'
import Contents from './Contents'

/*
    InterFace
*/
interface Param{
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  mode: 'no-cors' | 'cors' | 'same-origin',
  credentials: 'include' | 'same-origin' | 'same-origin' | 'omit',
}

/*
    REACT-COMPONENT
*/
const App: React.FC = () =>  {
  /*
      GET LOGIN USER NAME
  */
  const [loginName,setLoginName] = useState<string|null>('')
  function getLoginName(){
    const url:string ='http://127.0.0.1:8080/getusername'
    const param:Param={
      method:'GET',
      mode:'cors',
      credentials:'include'
    }

    fetch(url,param)
    .then(res=>res.text())
    .then(text=>setLoginName(text))
    .catch(err=>console.log('err',err))
  }
  getLoginName()

  /*
      GET PROJECT ID
  */
  const [projectId,setProjectId] =useState<number|null>(null)
  function handleProjectChange(project_id:number){
    setProjectId(project_id)
  }
  
  /*
      HANDLE WINDOW DISPLAY
  */
  const [isSmallWindowSize,setIsSmallWindowSize] =useState<boolean|undefined>()
  const [windowSize,setWindowSize] = useState<Number>(window.innerWidth)
  useEffect(()=>{
    window.addEventListener('resize',(e)=>{
      setWindowSize(window.innerWidth)
      if(window.innerWidth < 540){
        setIsSmallWindowSize(true)
      }else if(window.innerWidth >= 540){
        setIsSmallWindowSize(false)
      }
    })
  },[])

  const [showModalSidebar,setShowModalSidebar] = useState<boolean>()
  function modalSideBar(){
    if(showModalSidebar){
      setShowModalSidebar(false)
    }else{
      setShowModalSidebar(true)
    }
  }

  return (
    <div >
      <div className='col'>
        <div className='header'>
          {/* HEADER */}
          <Header user_name={loginName} 
                  windowSize = {windowSize}
                  is_show_menu_bar={isSmallWindowSize}
                  handleMenuBarPushed={modalSideBar}/> 
        </div>

        {/*LoginName有無で表示を切り替え*/}
        {loginName?
        <div className='row'>
          {/* SIDEBAR */}
          {showModalSidebar ? 
            <div id='overlay1' onClick={modalSideBar}>
              <div className='slide' onClick={(e)=>e.stopPropagation()}>
                <Sidebar handle_project_change={handleProjectChange}/>
              </div>
            </div>:
            ''
          }

          {(isSmallWindowSize && projectId!==null )? 
            '' :
            <div className='sidebar'>
              <Sidebar handle_project_change={handleProjectChange}/> 
            </div> 
          }

          {/* CONTENTS */}
          <div className='contents'> 
            <Contents project_id={projectId} />
          </div>
        </div>:
        <Login/>}
        {/*LoginName有無で表示を切り替え*/ }

      </div>
    </div>
    
  );
}

export default App;
