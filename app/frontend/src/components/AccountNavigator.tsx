import React, {useState} from "react";

/*
    PROPS
*/

interface Props{
  listenAccountInfoChange:Function
}

interface Param {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  mode: 'no-cors' | 'cors' | 'same-origin',
  credentials: 'include' | 'same-origin' | 'same-origin' | 'omit',
  headers:{'Content-Type':'application/json' | 'text/html' |'multipart/form-data'},
  body: string | null
}

interface NewName{
  name:string;
}

interface NewEmail{
  email:string;
}

function AccountNavigator<React>(props:Props){
  /*
      プロフィール編集画面呼び出しのボタン
  */
  const defaultBtnStyle:React.CSSProperties = {
    top:'0px',
    outline:'none',
    width:'80px',
    height:'30px',
    borderRadius:'20px 20px 20px 20px',
    backgroundColor:'#459915',
    border:'none',
    margin:'0 0 0 0',
    cursor:'pointer',
    fontSize:'14px',
  }

  const onMouseEnterBtnStyle:React.CSSProperties = {
    top:'0px',
    outline:'none',
    width:'80px',
    height:'30px',
    borderRadius:'20px 20px 20px 20px',
    backgroundColor:'#459915',
    border:'none',
    margin:'0 0 0 0',
    cursor:'pointer',
    fontSize:'18px',
  }

  const [btnStyle,setBtnStyle] = useState<React.CSSProperties>(defaultBtnStyle)

  function onMouseEnterBtn(){
    setBtnStyle(onMouseEnterBtnStyle)
  }

  function onMouseLeaveBtn(){
    setBtnStyle(defaultBtnStyle)
  }

  const [showAcEdit,setShowAcEdit] = useState<boolean>(false)
  function onClickBtn(){
    switch(showAcEdit){
      case true:
        setShowAcEdit(false);
        break;
      case false:
        setShowAcEdit(true);
        break;
    }
  }

  /*
      overlayの中央の、プロフィール編集画面
  */
  const accountEditFormStyle:React.CSSProperties = {
    width:'300px',
    height:'250px',
    backgroundColor:'#ffffff',
    fontSize:'18px',

    /*　画面の中央に要素を表示させる設定 */
    display:'flex',
    flexDirection:'column',
    alignItems: 'center',
  }

  const indexStyle:React.CSSProperties = {
    margin:'0px 0px 20px 0px',
    outline:'none',
    width:'280px',
    height:'35px',
    fontSize:'14px',
  }

  const inputStyle:React.CSSProperties = {
    outline:'none',
    width:'240px',
    height:'30px',
  }

  //上に、btnという文字を使ってcssを定義しているので、buttonとbtnを使い分けている。
  /*
      NAME INPUT
  */
  const defaultNameButtonStyle:React.CSSProperties = {
    width:'100px',
    height:'35px',
    backgroundColor:'#5498ab99',   
    outline:'none',
    border:'none',
    cursor:'pointer',
    fontSize:'14px',
  }

  const onMouseEnterNameButtonStyle:React.CSSProperties = {
    width:'100px',
    height:'35px',
    backgroundColor:'#5498ab99',   
    outline:'none',
    border:'none',
    cursor:'pointer',
    fontSize:'16px',
  }

  const [nameButtonStyle,setNameButtonStyle] = useState<React.CSSProperties>(defaultNameButtonStyle)

  function onMouseEnterNameButton(){
    setNameButtonStyle(onMouseEnterNameButtonStyle)
  }

  function onMouseLeaveNameButton(){
    setNameButtonStyle(defaultNameButtonStyle)
  }

  const [newUserName,setNewUserName] = useState<string|null>(null)
  function handleNameInput(e:any){//本当はanyではなく、型を明示するべき
    setNewUserName(e.target.value)
  }

  function onClickNameButton(){
    const new_name:NewName = {
      name:String(newUserName)
    }

    const url:string = 'http://127.0.0.1:8080/putusername'
    const param:Param={
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(new_name)
    }      
    
    fetch(url,param)
    .then(res=>console.log('success...',res))
    .then(res=>setTimeout(onClickBtn,300))
    .then(res=>props.listenAccountInfoChange())
    .catch(err=>console.log('err...',err))
  }

  /*
      Email Input
  */
      const defaultEmailButtonStyle:React.CSSProperties = {
        width:'100px',
        height:'35px',
        backgroundColor:'#5498ab99',   
        outline:'none',
        border:'none',
        cursor:'pointer',
        fontSize:'14px',
      }
    
      const onMouseEnterEmailButtonStyle:React.CSSProperties = {
        width:'100px',
        height:'35px',
        backgroundColor:'#5498ab99',   
        outline:'none',
        border:'none',
        cursor:'pointer',
        fontSize:'16px',
      }
    
      const [emailButtonStyle,setEmailButtonStyle] = useState<React.CSSProperties>(defaultEmailButtonStyle)
    
      function onMouseEnterEmailButton(){
        setEmailButtonStyle(onMouseEnterEmailButtonStyle)
      }
    
      function onMouseLeaveEmailButton(){
        setEmailButtonStyle(defaultEmailButtonStyle)
      }
    
      const [newUserEmail,setNewUserEmail] = useState<string|null>(null)
      function handleEmailInput(e:any){//本当はanyではなく、型を明示するべき
        setNewUserEmail(e.target.value)
      }
    
      function onClickEmailButton(){
        const new_name:NewEmail = {
          email:String(newUserEmail)
        }
    
        const url:string = 'http://127.0.0.1:8080/putusersemail'
        const param:Param={
          method: 'PUT',
          mode: 'cors',
          credentials: 'include',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify(new_name)
        }      
        
        fetch(url,param)
        .then(res=>console.log('success...',res))
        .then(res=>setTimeout(onClickBtn,300))
        .then(res=>props.listenAccountInfoChange())
        .catch(err=>console.log('err...',err))
      }
    

  return(
    <div>
      {/*
          showAcEditのtrue,falseに応じて、アカウント編集画面の表示を切り替える
      */}
      <button style={btnStyle} 
              onMouseEnter={onMouseEnterBtn}
              onMouseLeave={onMouseLeaveBtn}
              onClick={onClickBtn}>Profile</button>

      {showAcEdit?
        <div  id='overlay3' onClick={onClickBtn}>
          <div style={accountEditFormStyle} onClick={(e)=>e.stopPropagation()}>
            <p>プロフィール編集</p>
            
            <div style={indexStyle}>
              <input type='text' placeholder='name' style={inputStyle} onChange={(e)=>handleNameInput(e)}/>
              <button style={nameButtonStyle}                       
                      onClick={onClickNameButton}
                      onMouseEnter={onMouseEnterNameButton}
                      onMouseLeave={onMouseLeaveNameButton}>変更を保存</button>
            </div><br/>
            <div style={indexStyle}>
              <input type='text' placeholder='email' style={inputStyle} onChange={(e)=>handleEmailInput(e)}/>
              <button style={emailButtonStyle}                      
                      onClick={onClickEmailButton}
                      onMouseEnter={onMouseEnterEmailButton}
                      onMouseLeave={onMouseLeaveEmailButton}>変更を保存</button>
            </div>
          </div>
        </div>:
        ''}

    </div>
  )
}

export default AccountNavigator