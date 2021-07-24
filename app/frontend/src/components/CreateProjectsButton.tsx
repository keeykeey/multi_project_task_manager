import React, { useState } from 'react';
import './components.css';

/*
  PROPS
*/
interface Props{
  refetch_projects:Function;
}

/*
  INTERFACE
*/
interface Param {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  mode: 'no-cors' | 'cors' | 'same-origin',
  credentials: 'include' | 'same-origin' | 'same-origin' | 'omit',
  headers:{'Content-Type':'application/json' | 'text/html' |'multipart/form-data'},
  body: string | null
}

interface newProjects{
  name: string;
}

const CreateProjectsButton: React.FC<Props> = (props) => {
  /*
      CSS定義
  */
  const btnStyle:React.CSSProperties={
    outline:'none',
    width:'140px',
    height:'30px',
    color:'#ffffff',
    backgroundColor:'#5498ab99',
    border:'none',
    borderRadius:'20px',
    cursor:'pointer',
    margin:'2px auto auto auto'
  }
  const [cssProjectBtn,setCssProjectBtn] = useState<React.CSSProperties>(btnStyle)

  function mouseEnter(){
    const style:React.CSSProperties={
      outline:'none',
      width:'140px',
      height:'30px',
      color:'#ffffff',
      backgroundColor:'#5498ab99',
      border:'none',
      borderRadius:'20px',
      cursor:'pointer',
      margin:'2px auto auto auto',
      fontSize:'16px'
    }  
    setCssProjectBtn(style)
  }

  function mouseLeave(){
    setCssProjectBtn(btnStyle)
  }

  /*
　　   MODAL WINDOW
  */
  const [modalMode,setModalMode] = useState<boolean>(false)
  function switchModalMode(){
    switch (modalMode){
      case true:
        setModalMode(false);
        break;
      case false:
        setModalMode(true);
        break;
    };
  }

  const [modalStyle,setModalStyle] = useState<React.CSSProperties>()
  function giveModalStyle(e:any){//本当は明確な型を与えるべき
    const _x = e.clientX
    const _y = e.clientY
    const width:number = 250
    const height:number = 120
    var _yTooBig:0|1 =0
    if (_y>(window.innerHeight/2)){
      _yTooBig=1
    }

    const style:React.CSSProperties={
      top:_y-(_yTooBig*height),
      left:_x,
      position:'fixed',
      width:width,
      height:height,
      backgroundColor:'#ffffff',
      borderRadius:'20px 20px 20px 20px',
      alignItems:'left',
    }
    setModalStyle(style)
  }

  /*
    　INPUT FORM
  */ 
  const [textInput,setTextInput] = useState<string|null>(null)
  function handleTextInput(e:any){//本当はanyではなく、型を明示するべき
    setTextInput(e.target.value)
  }

  /* 
      CREATE BUTTOM
  */
  function create(){
    const url:string = 'http://127.0.0.1:8080/postprojects'
    const project:newProjects={
      name:String(textInput)
    }
    const param:Param={
      method:'POST',
      mode:'cors',
      credentials:'include',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(project)
    }
    
    fetch(url,param)
    .then(res=>console.log('success'))
    .catch(error=>console.log('error...',error))
    .then(res=>switchModalMode())
    .then(res=>props.refetch_projects())
    
    console.log(param)
  }

  return (
    <div >
      <button style={cssProjectBtn} 
              onMouseEnter={mouseEnter}
              onMouseLeave={mouseLeave}
              onClick={(e)=>{
                  switchModalMode()
                  giveModalStyle(e)
              }}>Add NEW </button>
      {modalMode ? 
      <div id='overlay1' onClick={switchModalMode}>
        <div  style={modalStyle} onClick={(e)=>e.stopPropagation()}>
          <p>Create a New Project</p>
          <input type='text' onChange={handleTextInput}  placeholder='text'></input><br/>
          <button  style={btnStyle} onClick={create}>CREATE</button>
        </div>
      </div>:
      null}
      
    </div>
  );
}

export default CreateProjectsButton;
