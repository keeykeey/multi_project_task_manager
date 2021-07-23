import React, { useState, ChangeEvent } from 'react';
import './components.css';
import '../App.css';

/*
    PROPS
*/
interface Props{
  project_id: number;
  project_name:string;
  handle_project_change:Function;
  refetch_projects:Function;
}

/*
    INTERFACE
*/
interface Param {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  mode: 'no-cors' | 'cors' | 'same-origin',
  credentials: 'include' | 'same-origin' | 'omit',
  headers: {'Content-Type':'application/json' | 'text/html' | 'multipart/form-data'}|{'projectid':string},
  body:string | null
}

/*
    COMPONENT
*/
const ProjectButton: React.FC<Props> = (props) => {
  /*
      CSS　STYLEの定義
  */
  const cssInputForm:React.CSSProperties={
    width:'150px',
    height:'30px',
  }

  const cssBtn:React.CSSProperties={
    width:'50px',
    height:'30px',
    backgroundColor:'#5498ab99',
    borderRadius:'10px',
    border:'none',
    color:'#ffffff',
    font:'bold',
  }

  /*
      PROJECT名変更用のモーダルwindow
  */
  const [modal,setModal] = useState<boolean>(false)
  function switchModalMode(){
    switch(modal){
      case true:
        setModal(false)
        break;
      case false:
        setModal(true)
        break;
    }
  }

  /*
      PROJECT名変更用のモーダルwindow
  */
  const [modalStyle,setModalStyle] = useState<React.CSSProperties>()
  function giveModalStyle(e:any){//本当はanyではなく、型を明示するべき
    const _x = e.clientX
    const _y = e.clientY
    const style:React.CSSProperties={
      top:_y,//クリック位置より少しずらしてモーダルを表示した方が、操作性が快適だと思うため-3した
      left:_x,//クリック位置より少しずらしてモーダルを表示した方が、操作性が快適だと思うため-3した
      position:'fixed',
      width:'250px',
      height:'150px',
      backgroundColor:'#ffffff',
      borderRadius:'20px 20px 20px 20px',
      alignItems:'left'
    }
    setModalStyle(style)
  }

  const[pname,setPname]=useState<string|null>(null)
  function changeProjectName(e:ChangeEvent<HTMLInputElement>){
    setPname(e.target.value)
  }

  function editProjectName(){
    const url:string ='http://127.0.0.1:8080/putprojects'
    const param:Param={
      method:'PUT',
      mode:'cors',
      credentials:'include',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        'id':Number(props.project_id),
        'name':String(pname)
      })
    }

    fetch(url,param)
    .then(res=>console.log('success',res))
    .then(res=>props.handle_project_change(props.project_id))
    .then(res=>props.refetch_projects())
    .then(res=>switchModalMode())
  }

  return (
    <div>
      <button className='ProjectButton' 
              onClick={()=>props.handle_project_change(props.project_id)}
              onDoubleClick={(e)=>{
                switchModalMode()
                giveModalStyle(e)
              }}> 
        { props.project_name } 
      </button>
      {modal?
      <div id='overlay1' onClick={switchModalMode}>
        <div style={modalStyle} onClick={(e)=>e.stopPropagation()}>
          <p>タスク名を変更</p>
          <input type='text' placeholder={props.project_name} 
                 onChange={(e)=>changeProjectName(e)}/>
          <button style={cssBtn} onClick={editProjectName}>Send</button>
        </div>

      </div>:
      ''}

    </div>
  );
}

export default ProjectButton;
