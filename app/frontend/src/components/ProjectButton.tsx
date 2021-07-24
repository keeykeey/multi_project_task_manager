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

  const cssEditBtn:React.CSSProperties={
    width:'50px',
    height:'30px',
    margin:'0px auto 0px 5px',
    backgroundColor:'#5498ab99',
    borderRadius:'10px',
    border:'none',
    color:'#ffffff',
    font:'bold',
    cursor:'pointer',
  }

  const cssDeleteBtn:React.CSSProperties={
    width:'50px',
    height:'30px',
    margin:'0px auto 0px 5px',
    backgroundColor:'#aa5555',
    borderRadius:'10px',
    border:'none',
    color:'#ffffff',
    font:'bold',  
    cursor:'pointer',  
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
  function giveModalStyle(e:any){　//本当は（MouseEventなど）明確な型を指定するべき
    const _y = e.clientY
    const _x = e.clientX
    const width:number = 250
    const height:number = 180
    var _yTooBig:0|1 =0
    if (_y>(window.innerHeight/2)){
      _yTooBig=1
    }

    const style:React.CSSProperties={
      top:_y-(_yTooBig*height),//クリック位置より少しずらしてモーダルを表示した方が、操作性が快適だと思うため-3した
      left:_x,//クリック位置より少しずらしてモーダルを表示した方が、操作性が快適だと思うため-3した
      position:'fixed',
      width:width,
      height:'180px',
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

  /*
      削除確認のモーダル
  */
      const [l2modal,setL2modal] = useState<boolean>(false)
      function switchL2ModalMode(){
        switch(l2modal){
          case true:
            setL2modal(false)
            break;
          case false:
            setL2modal(true)
            break;
        }
      }

      const [cssDeleteAlert,setCssDeleteAlert] = useState<React.CSSProperties>()
      function giveL2ModalStyle(e:any){
        const _x:number = e.clientX
        const _y:number = e.clientY
        const style:React.CSSProperties={
          position:'fixed',
          left:_x+2,
          top:_y+2,
          width:'200px',
          height:'80px',
          backgroundColor:'#eeeeee',
          borderRadius:'10px',
          font:'14px bold',  
        }
        setCssDeleteAlert(style)
      }

      function deleteProject(){
        const url:string='http://127.0.0.1:8080/deleteprojects'
        const param:Param={
          method:'DELETE',
          mode:'cors',
          credentials:'include',
          headers:{
            'projectid':String(props.project_id)
          },
          body:null,
        }

        fetch(url,param)
        .then(res=>console.log('success'))
        .then(res=>{
          switchL2ModalMode()
          switchModalMode()})
        .then(res=>props.refetch_projects())
        .catch(err=>console.log('err',err))
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
                 style={cssInputForm}
                 onChange={(e)=>changeProjectName(e)}/>
          <button style={cssEditBtn} onClick={editProjectName}>Send</button>
          <p>タスクを削除 
            <button style={cssDeleteBtn} 
                    onClick={(e)=>{
                      switchL2ModalMode()
                      giveL2ModalStyle(e)
                    }}>Delete</button>
          </p>
          {/*  l2modalのtrue,falseにより、警告（本当に削除して良いか）出す出さないの表示を切り替え  */}
            {l2modal?
              <div id='overlay1' onClick={switchL2ModalMode}>
              <div style={cssDeleteAlert} onClick={(e)=>e.stopPropagation()}>
                <p>本当に削除しますか？</p>
                <button style={cssDeleteBtn} onClick={deleteProject}>yes</button>
                <button style={cssDeleteBtn} onClick={switchL2ModalMode}>no</button>
              </div>
              </div>:
              ''            
            }
          {/*  l2modalのtrue,falseにより、警告（本当に削除して良いか）出す出さないの表示を切り替え  */}  

        </div>
      </div>:
      ''}

    </div>
  );
}

export default ProjectButton;
