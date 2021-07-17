import React, { useState } from 'react';
import './components.css';
import { RiDeleteBin6Line } from 'react-icons/ri'; 
import { FiEdit } from 'react-icons/fi';
import { GoAlert } from 'react-icons/go';

/*
    PROPS
*/
interface Props{
  id: number;
  text: string;
  deadline: string;
  taskpriority: number;
  editInfoTrigger:Function;
}

/*
    INTERFACE
*/
interface Param {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  mode: 'no-cors' | 'cors' | 'same-origin',
  credentials: 'include' | 'same-origin' | 'same-origin' | 'omit',
  headers:{'Content-Type':'application/json' | 'text/html' |'multipart/form-data'}|{'taskid':string},
  body: string | null
}

interface EditTaskForm{
  id: number;
  name: string;
  deadline: string;
  taskpriority: number;//1,2,3
}

/*
    COMPONENT
*/
const TaskCard: React.FC<Props> = (props) => {
  /*
    TASK CARD STYLES
    本当はcssのみで設定できた方が、シンプルで良いと思うが、TASK CARDの色をユーザーアクション、priorityに応じて動的に変えられる等にするためには、
    どうしてもtypescriptで書く必要があった。cssのみでかける方法が分かれば、書き直したい。
  */
  const priorityColor:string[] = ['','#dd4400','#0044dd','#44dd44']
　  /* 
        -------------------------------------
        priorityColor   |   taskpriority(DB)
        -------------------------------------
        ''              |   
        '#dd4400'       |   1
        '#0044dd'       |   2
        '#44dd44'       |   3
        -------------------------------------
        というマッピングになっているので、priorityColorの0要素目は''にしている。
　　　　　taskpriorityに設定する値は、0スタートではなく1スタートという仕様にしている。
    */
  const priorityWords:string[] = ['Important','Noraml','Not so important']

  const task_card_style:React.CSSProperties={
    outline:'none',
    margin:'0px 0px 0px 0px',
    width:'260px',
    height:'90%',
    //hoverした時に色が濃くなるように、アルファ(+'99')を設定。
    backgroundColor:priorityColor[props.taskpriority]+'99',
    border:'none',
    borderRadius:20,
    cursor:'pointer', 
  }

  const task_card_style_hover:React.CSSProperties={
    outline:'none',
    margin:'0px 0px 0px 0px',
    width:'260px',
    height:'90%',
    //DBに(0,1,2ではなく)1,2,3で値を入れているから、インデックス番号として使う時にはマイナス１している。
    //hoverした時に色が濃くなるように、アルファ(+'99')を無くした。
    backgroundColor:priorityColor[props.taskpriority-1],
    border:'none',
    borderRadius:20,
    cursor:'pointer', 
    fontSize:'1.1em',         
  }

  const [taskCardStyle,setTaskCardStyle] = useState<React.CSSProperties>(task_card_style)//TaskCardのStyleの初期値

  function handleHoverTaskCard(cssProperties:React.CSSProperties){
    /*
        ユーザーのマウス操作ごとにcssPropertiesを入れ替え、TASK CARDのスタイルを変更する。
    */
    setTaskCardStyle(cssProperties)  
  }

  /*
      MODAL WINDOWS
  */
  const [showModalDeleteWindow,setShowModalDeleteWindow] = useState<boolean>()
  function modalDeleteWindow(){
    if(showModalDeleteWindow){
      setShowModalDeleteWindow(false)
    }else{
      setShowModalDeleteWindow(true)
    }
  }

  const [showModalEditWindow,setShowModalEditWindow] = useState<boolean>()
  function modalEditWindow(){
    if(showModalEditWindow){
      setShowModalEditWindow(false)
    }else{
      setShowModalEditWindow(true)
    }
  }

  const [modalStyle,setModalStyle] = useState<React.CSSProperties>()
  //本当はeにanyではなく明確な型を与えるべき。
  function giveModalStyle(e:any){
    const _x:number = e.clientX
    const _y:number = e.clientY
    const width:number = 200
    const height:number = 130
    const style:React.CSSProperties={
      width:width,
      height:height,
      position:'fixed',
      top:_y-height,
      left:_x-width,
      backgroundColor:'#ffffff',
      border:'0.1rem solid',
    }
    setModalStyle(style)
  }
  
  /*
      delete-tasks modal window
  */
  function deleteTask(){   
    const url: string = 'http://127.0.0.1:8080/deletetasks'
    const param:Param = {
      method:'DELETE',
      mode:'cors',
      credentials:'include',
      headers:{
        'taskid':String(props.id)
      },
      body:null
    }
    
    fetch(url,param)
    .then(res=>console.log('success...'))
    .then(res=>{
      setTimeout(modalDeleteWindow,500)
      setTimeout(props.editInfoTrigger,800)
    })
    .catch(error=>console.log('error...',error))
  }

  /*
      edit-tasks modal window
  */
  const [taskNameInput,setTaskNameInput] = useState<string>()
  const [deadLineInput,setDeadLineInput] = useState<string>()
  const [priorityInput,setPriorityInput] = useState<number>()

  function handleTaskNameInput(e:any){//本当は(e:any)ではなく、型を指定するべき。
    setTaskNameInput(e.target.value)
  }
  
  function handleDeadLineInput(e:any){//本当は(e:any)ではなく、型を指定するべき。
    setDeadLineInput(e.target.value)
  }

  function handlePriorityInput(e:any){//本当は(e:any)ではなく、型を指定するべき。
    setPriorityInput(e.target.value)
  }

  function editTask(){
    const url: string = 'http://127.0.0.1:8080/puttasks'
    const edit_form: EditTaskForm = {
      id: Number(props.id),
      name: String(taskNameInput),
      deadline: String(deadLineInput),
      taskpriority: Number(priorityInput)     
    }
    const param:Param = {
      method:'PUT',
      mode:'cors',
      credentials:'include',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(edit_form)
    }

    fetch(url,param)
    .then(res=>console.log('success...'))
    .then(res=>{
      setTimeout(modalEditWindow,500)
      setTimeout(props.editInfoTrigger,550)
    })
    .catch(error=>console.log('error...',error))
  }
  
  /*
      JSX
  */
  return (
    <div>
      <div className='TaskCardBlock'>

        {/* CARD */}
        <button style={taskCardStyle}
                onMouseLeave={()=>handleHoverTaskCard(task_card_style)}
                onMouseEnter={()=>handleHoverTaskCard(task_card_style_hover)}>{ props.text }</button>

        {/* DELETE ICON*/}
        <div  className='TaskCardIcon'>
          <RiDeleteBin6Line onClick={(e)=>{
            modalDeleteWindow()
            giveModalStyle(e)
          }}/>
        </div>
        {showModalDeleteWindow?
          <div id='overlay2' onClick={modalDeleteWindow}>
            <div style={modalStyle} onClick={(e)=>e.stopPropagation()}>
              <p ><GoAlert/>do you really delete it?</p>
              <button className='btnInModal' onClick={deleteTask}>yes</button>
              <button className='btnInModal' onClick={modalDeleteWindow}>no</button>
            </div>
          </div>:
        ''}

        {/* EDIT ICON */}
        <div className='TaskCardIcon'>
          <FiEdit onClick={(e)=>{
            modalEditWindow()
            giveModalStyle(e)
          }}/>
        </div>
        {showModalEditWindow?
          <div id='overlay3' onClick={modalEditWindow}>
            <div style={modalStyle} onClick={(e)=>e.stopPropagation()}>
              <div>Edit</div>
              <ul>
                <input type='text' onChange={(e)=>handleTaskNameInput(e)} placeholder={props.text}/>
                <input type='date' onChange={(e)=>handleDeadLineInput(e)} placeholder={props.deadline.slice(0,10)}/>
                <select onChange={(e)=>handlePriorityInput(e)}>
                  <option value=''></option>
                  <option value='1'>{priorityWords[0]}</option>
                  <option value='2'>{priorityWords[1]}</option>
                  <option value='3'>{priorityWords[2]}</option>
                </select>
                <button onClick={editTask}>Edit the Task</button>
              </ul>              
            </div>
          </div>:
        ''}

      </div>

      {/* DEAD LINE */}
      <div className='TaskDeadLineBlock' > 
        Dead Line : {props.deadline.slice(0,10)}
      </div>
    </div>

  );
}

export default TaskCard;
