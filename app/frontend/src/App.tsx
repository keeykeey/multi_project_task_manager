import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header'
import Sidebar from './Sidebar'
import Contents from './Contents'

/*
    REACT-COMPONENT
*/
const App: React.FC = () =>  {
  /*
      HANDLE USER LOGIN
  */

  const [projectId,setProjectId] =useState<number|null>(null)
  function handleProjectChange(project_id:number){
    setProjectId(project_id)
  }
  
  /*
      HANDLE WINDOW DISPLAY
  */
  const [isSmallWindowSize,setIsSmallWindowSize] =useState<boolean|undefined>()
  useEffect(()=>{
    window.addEventListener('resize',()=>{
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
          <Header user_id={100} 
             user_name='testtest' 
             is_show_menu_bar={isSmallWindowSize}
             handleMenuBarPushed={modalSideBar}/> 
        </div>
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
        </div>
      </div>
    </div>
    
  );
}

export default App;
