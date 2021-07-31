import React, { useState } from 'react';
import './components.css';

/*
  PROPS
*/
interface Props{
  projectid: number|null;
  editInfoTrigger:Function;
}

/*
  INTERFACE
*/
interface Param {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  mode: 'no-cors' | 'cors' | 'same-origin',
  credentials: 'include' | 'same-origin' | 'omit',
  headers:{'Content-Type':'application/json' | 'text/html' |'multipart/form-data'}|{'taskid':string},
  body: string | null
}

interface newTasks{
  name:string;
  projectid:Number;
  deadline:string;
  taskpriority:Number;//1,2,3
}


const CreateTasksButton: React.FC<Props> = (props) => {
  const priorityWords:string[] = ['Important','Noraml','Not so important']
  /*
    MODAL WINDOW
  */
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

  /*
    INPUT FORM
  */ 
  const [textInput,setTextInput] = useState<string|null>(null)
  function handleTextInput(e:any){//本当はanyではなく、型を明示するべき
    setTextInput(e.target.value)
  }

  const [dateInput,setDateInput] = useState<string|null>(null)
  function handleDateInput(e:any){//本当はanyではなく、型を明示するべき
    setDateInput(e.target.value)
  }

  const [priorityNum,setPriorityNum] = useState<number|null>(null)
  function handlePriorityInput(e:any){//本当はanyではなく、型を明示するべき
    setPriorityNum(e.target.value)
  }

  function create(){
    const url:string = 'http://127.0.0.1:8080/posttasks'
    const task:newTasks={
      name:String(textInput),
      projectid:Number(props.projectid),
      deadline:String(dateInput),
      taskpriority:Number(priorityNum),
    }
    const param:Param={
      method:'POST',
      mode:'cors',
      credentials:'include',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(task)
    }
    
    fetch(url,param)
    .then(res=>console.log('success'))
    .then(res=>{
      setTimeout(changeModalMode,500)
      setTimeout(props.editInfoTrigger,800)
    })
    .catch(error=>console.log('error...',error))
    
   console.log(param)
  }

 
  return (
    <div className='CreateTasksButtonBlock'>
      <button className='ShowCreateWindow' onClick={changeModalMode}>NEW </button>
      {modalMode ? 
      <div id='overlay_create' onClick={changeModalMode}>
        <div className='ModalCreateTasks' onClick={(e)=>e.stopPropagation()}>
          <p>Create New Tasks</p>
          <input type='text' onChange={handleTextInput} className='CreateTasksInput' placeholder='text'></input><br/>
          <input type='date' onChange={handleDateInput} className='CreateTasksInput' placeholder='text'></input><br/>
          <select onChange={handlePriorityInput} className='CreateTasksInput'>
                  <option ></option>
                  <option value='1'>{priorityWords[0]}</option>
                  <option value='2'>{priorityWords[1]}</option>
                  <option value='3'>{priorityWords[2]}</option>
          </select><br/>
          <button className='CreateTasksButton' onClick={create}>CREATE</button>
        </div>
      </div>:
      null}
      
    </div>
  );
}

export default CreateTasksButton;
