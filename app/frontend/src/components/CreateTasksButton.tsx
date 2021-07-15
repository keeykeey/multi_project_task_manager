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
        console.log('true');
        break;
      case false:
        setModalMode(true);
        console.log('false');
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
    </div>
  );
}

export default CreateTasksButton;
