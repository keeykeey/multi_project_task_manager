import React, { useState } from 'react';
import './components.css';
import { RiDeleteBin6Line } from 'react-icons/ri'; 
import { FiEdit } from 'react-icons/fi';

/*
    PROPS
*/
interface Props{
  id: number;
  text: string;
  deadline: string;
  taskpriority: number;
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
  const priorityColor:string[] = ['#ab3140','#45a371','#8be0b0']

  const task_card_style:React.CSSProperties={
    margin:'3px 3px 3px 3px',
    width:'260px',
    height:'90%',
    //DBに(0,1,2ではなく)1,2,3で値を入れているから、インデックス番号として使う時にはマイナス１している。
    //hoverした時に色が濃くなるように、アルファ(+'99')を設定。
    backgroundColor:priorityColor[props.taskpriority-1]+'99',
    border:'none',
    cursor:'pointer', 
  }

  const task_card_style_hover:React.CSSProperties={
    margin:'3px 3px 3px 3px',
    width:'260px',
    height:'90%',
    //DBに(0,1,2ではなく)1,2,3で値を入れているから、インデックス番号として使う時にはマイナス１している。
    //hoverした時に色が濃くなるように、アルファ(+'99')を無くした。
    backgroundColor:priorityColor[props.taskpriority-1],
    border:'none',
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
    const height:number = 100
    const style:React.CSSProperties={
      width:width,
      height:height,
      position:'fixed',
      top:_y-height,
      left:_x-width,
      backgroundColor:'#ffffff',
    }
    setModalStyle(style)
  }

  function deleteTask(){
    console.log('you delete it')
  }

  function editTask(){
    console.log('you edit it')
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
              <p>do you really delete it?</p>
              <button onClick={deleteTask}>yes</button>
              <button onClick={modalDeleteWindow}>no</button>
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
              <p>edit modal window</p>
              <button onClick={editTask}>Edit</button>
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
