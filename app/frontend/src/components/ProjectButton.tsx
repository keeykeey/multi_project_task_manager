import React, { useState } from 'react';
import './components.css';

interface Props{
  project_id: number;
  project_name:string;
  handle_project_change:Function;
}

const ProjectButton: React.FC<Props> = (props) => {
  const [modal,setModal] = useState<boolean>(false)
  function switchModalMode(e:any){
    switch(modal){
      case true:
        setModal(false)
        break;
      case false:
        setModal(true)
        break;
    }
    giveModalStyle(e)
  }

  const [modalStyle,setModalStyle] = useState<React.CSSProperties>()
  function giveModalStyle(e:any){//本当はanyではなく、型を明示するべき
    const _x = e.clientX
    const _y = e.clientY
    const style:React.CSSProperties={
      top:_y+3,//クリック位置より少しずらしてモーダルを表示した方が、操作性が快適だと思うため-3した
      left:_x+3,//クリック位置より少しずらしてモーダルを表示した方が、操作性が快適だと思うため-3した
      position:'fixed',
      width:'300px',
      height:'300px',
      backgroundColor:'#ffffff'
    }
    setModalStyle(style)
  }




  return (
    <div>
      <button className='ProjectButton' 
              onMouseEnter={()=>props.handle_project_change(props.project_id)}
              onClick={switchModalMode}> 
        { props.project_name } 
      </button>
      {modal?
      <div id='overlay2' onClick={switchModalMode}>
        <div style={modalStyle} onClick={(e)=>e.stopPropagation()}>
          <p>タスク名を変更</p>
          <input type='text'/>
        </div>

      </div>:
      ''}

    </div>
  );
}

export default ProjectButton;
