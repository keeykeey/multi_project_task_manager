import React, { useState,ChangeEvent } from 'react';
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
  credentials: 'include' | 'same-origin' | 'omit',
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

  /*
    CSS STYLE DEFINITION 
    & HANDLE CSS FUNCTIONS
  */

  const task_card_block_style:React.CSSProperties={
    outline:'none',
    borderRadius:'20px',
    height:'90px',
    verticalAlign:'middle',
    display:'flex',
    backgroundColor:'#ffffff'
  }

  const task_card_style:React.CSSProperties={
    outline:'none',
    margin:'0px 0px 0px 0px',
    width:'260px',
    height:'90%',
    //hoverした時に色が濃くなるように、アルファ(+'cc')を設定。
    backgroundColor:priorityColor[props.taskpriority]+'cc',
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
    //hoverした時に色が濃くなるように、アルファ(+'cc')を無くした。
    backgroundColor:priorityColor[props.taskpriority],
    border:'none',
    borderRadius:20,
    cursor:'pointer', 
  }
  const [taskCardStyle,setTaskCardStyle] = useState<React.CSSProperties>(task_card_style)//TaskCardのStyleの初期値
  function handleHoverTaskCard(cssProperties:React.CSSProperties){
    /*
        ユーザーのマウス操作ごとにcssPropertiesを入れ替え、TASK CARDのスタイルを変更する。
    */
    setTaskCardStyle(cssProperties)  
  }

  const task_card_icon_style:React.CSSProperties={
    height:'40px',
    width:'20px',
    margin:'20px 5px auto 5px',
    padding:'0 5px 0 5px',
    cursor:'pointer',
  }
  const task_card_icon_style_hover:React.CSSProperties={
    height:'40px',
    width:'20px',
    margin:'17px auto auto 3px',
    padding:'0 5px 0 5px',
    cursor:'pointer',
    fontSize:'1.3em',
  }
  const [deleteIconBlockStyle,setDeleteIconStyle]=useState<React.CSSProperties>(task_card_icon_style)
  function enterDeleteIcon(){
    setDeleteIconStyle(task_card_icon_style_hover)
  }
  function leaveDeleteIcon(){
    setDeleteIconStyle(task_card_icon_style)
  }
  const [editIconStyle,setEditIconStyle]=useState<React.CSSProperties>(task_card_icon_style)
  function enterEditIcon(){
    setEditIconStyle(task_card_icon_style_hover)
  }
  function leaveEditIcon(){
    setEditIconStyle(task_card_icon_style)
  }

  const deadline_block_style:React.CSSProperties={
    textAlign:'right',
    margin:'0px 0px 10px 0',
    backgroundColor:'#ffffff',
  }

  const btnInModalStyle:React.CSSProperties={
    width:'40px',
    textAlign:'center',
    margin:'0px 10px 0px 10px',
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
    /*
        モーダル画面を一度表示し、入力フォームに文字をタイプし、たのちモーダル画面を閉じ、
        その後サイドモーダル画面を表示すると、
        入力フォームには何も入力されていないかのように見えるが、先にタイプした文字が内部的には保持されたまま。
        そこで、モーダル画面を表示するために、フォームの各インプットを初期化する。
    */
    setTaskNameInput(props.text)
    setDeadLineInput(props.deadline)
    setPriorityInput(props.taskpriority)
  }

  const [modalStyle,setModalStyle] = useState<React.CSSProperties>()
  function giveModalStyle(e:React.MouseEvent){
    const _x:number = e.clientX
    const _y:number = e.clientY
    const width:number = 205
    const height:number = 170
    var _yTooBig:0|1 =0
    if (_y>(window.innerHeight/2)){
      _yTooBig=1
    }
    const style:React.CSSProperties={
      width:width,
      height:height,
      position:'fixed',
      top:_y-(_yTooBig*height)-2,
      left:_x-width-2,
      backgroundColor:'#ffffff',
      borderRadius:'20px',
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
  const [taskNameInput,setTaskNameInput] = useState<string>(props.text)
  const [deadLineInput,setDeadLineInput] = useState<string>(props.deadline)
  const [priorityInput,setPriorityInput] = useState<number>(props.taskpriority)

  function handleTaskNameInput(e:ChangeEvent<HTMLInputElement>){
    setTaskNameInput(e.target.value)
  }
  
  function handleDeadLineInput(e:ChangeEvent<HTMLInputElement>){
    setDeadLineInput(e.target.value)
  }

  function handlePriorityInput(e:ChangeEvent<HTMLSelectElement>){
    setPriorityInput(Number(e.target.value))
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
      setTimeout(modalEditWindow,400)
      setTimeout(props.editInfoTrigger,500)
    })
    .catch(error=>console.log('error...',error))
  }
  
  /*
      JSX
  */
  return (
    <div>
      <div style={task_card_block_style}>

        {/* CARD */}
        <button style={taskCardStyle}
                onMouseLeave={()=>handleHoverTaskCard(task_card_style)}
                onMouseEnter={()=>handleHoverTaskCard(task_card_style_hover)}>{ props.text }</button>

        {/* DELETE ICON*/}
        <div style={deleteIconBlockStyle}
             onMouseEnter={enterDeleteIcon}
             onMouseLeave={leaveDeleteIcon}>
          <RiDeleteBin6Line onClick={(e)=>{
            modalDeleteWindow()
            giveModalStyle(e)
          }}/>
        </div>
        {showModalDeleteWindow?
          <div id='overlay2' onClick={modalDeleteWindow}>
            <div style={modalStyle} onClick={(e)=>e.stopPropagation()}>
              <p ><GoAlert/>本当に削除しますか？</p>
              <button style={btnInModalStyle} onClick={deleteTask}>yes</button>
              <button style={btnInModalStyle} onClick={modalDeleteWindow}>no</button>
            </div>
          </div>:
        ''}

        {/* EDIT ICON */}
        <div style={editIconStyle}
             onMouseEnter={enterEditIcon}
             onMouseLeave={leaveEditIcon}>
          <FiEdit onClick={(e)=>{
            modalEditWindow()
            giveModalStyle(e)
          }}/>
        </div>
        {showModalEditWindow?
          <div id='overlay3' onClick={modalEditWindow}>
            <div style={modalStyle} onClick={(e)=>e.stopPropagation()}>
              <p>編集画面</p>
              <ul>
                <input type='text' onChange={(e)=>handleTaskNameInput(e)} placeholder={props.text}/>
                <input type='date' onChange={(e)=>handleDeadLineInput(e)} placeholder={props.deadline.slice(0,10)}/>
                <select onChange={(e)=>handlePriorityInput(e)}>
                  <option value=''></option>
                  <option value='1'>{priorityWords[0]}</option>
                  <option value='2'>{priorityWords[1]}</option>
                  <option value='3'>{priorityWords[2]}</option>
                </select>
                <button onClick={()=>{
                  editTask()
                  setTimeout(()=>setTaskCardStyle(task_card_style))
                  }}>Edit the Task</button>
              </ul>              
            </div>
          </div>:
        ''}

      </div>

      {/* DEAD LINE */}
      <div style={deadline_block_style} > 
        Dead Line : {props.deadline.slice(0,10)}
      </div>
    </div>

  );
}

export default TaskCard;
