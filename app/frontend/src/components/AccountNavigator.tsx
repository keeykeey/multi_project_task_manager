import React, {useState} from "react";

function AccountNavigator<React>(){
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
  function onClick(){
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
    height:'150px',
    backgroundColor:'#ffffff',
    fontSize:'18px',

    /*　画面の中央に要素を表示させる設定 */
    display:'flex',
    flexDirection:'column',
    alignItems: 'center',
  }

  const indexStyle:React.CSSProperties = {
    width:'280px',
    height:'35px',
    fontSize:'14px',
  }

  const inputStyle:React.CSSProperties = {
    width:'240px',
    height:'30px',
  }

  //上に、btnという文字を使ってcssを定義しているので、buttonとbtnを使い分けている。
  const defaultButtonStyle:React.CSSProperties = {
    width:'100px',
    height:'35px',
    backgroundColor:'#5498ab99',   
    outline:'none',
    border:'none',
    cursor:'pointer',
    fontSize:'14px',
  }

  const onMouseEnterButtonStyle:React.CSSProperties = {
    width:'100px',
    height:'35px',
    backgroundColor:'#5498ab99',   
    outline:'none',
    border:'none',
    cursor:'pointer',
    fontSize:'16px',
  }

  const [buttonStyle,setButtonStyle] = useState<React.CSSProperties>(defaultButtonStyle)

  function onMouseEnterButton(){
    setButtonStyle(onMouseEnterButtonStyle)
  }

  function onMouseLeaveButton(){
    setButtonStyle(defaultButtonStyle)
  }

  return(
    <div>
      {/*
          shoeAcEditのtrue,falseに応じて、アカウント編集画面の表示を切り替える
      */}
      <button style={btnStyle} 
              onMouseEnter={onMouseEnterBtn}
              onMouseLeave={onMouseLeaveBtn}
              onClick={onClick}>Profile</button>

      {showAcEdit?
        <div  id='overlay3' onClick={onClick}>
          <div style={accountEditFormStyle} onClick={(e)=>e.stopPropagation()}>
            <p>プロフィール編集</p>
            
            <div style={indexStyle}>名前
              <input type='text' style={inputStyle}/>
              <button style={buttonStyle} 
                      onMouseEnter={onMouseEnterButton}
                      onMouseLeave={onMouseLeaveButton}>変更を保存</button>
            </div>
          </div>
        </div>:
        ''}

    </div>
  )
}

export default AccountNavigator