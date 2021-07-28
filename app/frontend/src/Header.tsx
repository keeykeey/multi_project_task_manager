import React, { useState, MouseEvent } from 'react';
import { CgMenuGridR } from 'react-icons/cg';
import { GoPerson } from 'react-icons/go';
//https://react-icons.github.io/react-icons
import AccountNavigator from './components/AccountNavigator'
import Logout from './components/Logout'

interface Props{
  user_name: string |null;
  listenAccountInfoChange: Function;
  windowWidth: Number;
  is_show_menu_bar : boolean | undefined;
  handleMenuBarPushed : Function;
}

const Header: React.FC<Props> = (props) =>{
  const appIcon:React.CSSProperties={
    height:'35px',
    width:'35px',
  }
  
  const cssMenu:React.CSSProperties={
    margin:'2px 2px 2px 2px',
    height:'35px',
    width:'35px',
    color:'#505050',
  }  
  
  const cssHeaderMessage:React.CSSProperties={
    fontSize:'35px',
  }
  
  const cssPerson:React.CSSProperties={
    margin:`0 0 0 ${Number(props.windowWidth)-310}px`,
    cursor:'pointer',
  }

  const [showModal,setShowModal] = useState<boolean>(false)
  function switchModal(){
    switch(showModal){
      case false:
        setShowModal(true);
        break;
      case true:
        setShowModal(false);
        break;
    }
  }

  const [modalStyle,setModalStyle]=useState<React.CSSProperties>()
  function giveModalStyle(e:MouseEvent){
    const width:number = 80
    const height:number = 30
    const _x:number = e.clientX
    const _y:number = e.clientY
    
    const style:React.CSSProperties={
      width:String(width)+'px',
      height:String(height)+'px',
      position:'fixed',
      top: _y+2 ,
      left: _x-width,
      backgroundColor:'#ffffff00',
      textAlign:'right',
    }  
    setModalStyle(style)
  }
  
  return (
    <div>
      <div>
        {props.is_show_menu_bar ? < CgMenuGridR style={cssMenu} onClick={()=>props.handleMenuBarPushed()}/>:''}
        <div style={cssHeaderMessage}>

          {/* ログイン状態に応じてヘッダーの表示を切り替え*/}
          {props.user_name?
           <div>
             Hello {props.user_name}
             <GoPerson style={cssPerson} 
                     onClick={(e)=>{
                       switchModal()
                       giveModalStyle(e)}}/>
           </div>:
           <div><img style={appIcon} src='./appicon.jpg' alt='img'></img>Please Login</div> }
          {/* ログイン状態に応じてヘッダーの表示を切り替え*/}

          {/* Personアイコンクリックでモーダル画面切り替え */}
          {showModal?
          <div id='overlay_white' onClick={switchModal}>
            <div style={modalStyle} onClick={(e)=>e.stopPropagation()}>
              <AccountNavigator listenAccountInfoChange={props.listenAccountInfoChange}/>
              <Logout/>
            </div>
          </div>:
          ''}
          {/* Personアイコンクリックでモーダル画面切り替え */}

        </div>
      </div><hr/>
    </div>
  );
}

export default Header;
