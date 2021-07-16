import React, { useState } from 'react';
import './components.css';

/*
  PROPS
*/
interface Props{
  userid:number
  projectid: number|null;
  editInfoTrigger:Function;
}

/*
  INTERFACE
*/
interface newTasks{
  text:string;
  deadline:string;
  taskpriority:number;
}


const CreateTasksButton: React.FC<Props> = (props) => {
  const [modalMode,setModalMode] = useState<boolean>(false)
  function changeModalMode(){
    switch (modalMode){
      case true:
        setModalMode(false);
        break;
      case false:
        setModalMode(true);
        break;
    };
  }

  function create(){
    console.log('create')
    //const t:newTasks
  }

 
  return (
    <div className='CreateTasksButtonBlock'>
      <button className='CreateTasksButton' onClick={changeModalMode}>NEW </button>
      {modalMode ? 
      <div id='overlay_create' onClick={changeModalMode}>
        <div className='modalCreateTasks' onClick={(e)=>e.stopPropagation()}>
          hello
        </div>
      </div>
      :
      null}
    </div>
  );
}

export default CreateTasksButton;
