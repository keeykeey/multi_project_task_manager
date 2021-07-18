import './App.css'
import React from 'react';
import { CgMenuGridR } from 'react-icons/cg';
import { GoPerson } from 'react-icons/go';
//https://react-icons.github.io/react-icons

interface Props{
  user_name: string |null;
  is_show_menu_bar : boolean | undefined;
  handleMenuBarPushed : Function;
}

const Header: React.FC<Props> = (props) =>{
  return (
    <div >
      <div className='row'>
        {props.is_show_menu_bar ? < CgMenuGridR className='menu' onClick={()=>props.handleMenuBarPushed()}/>:''}
        <div className='header-message'>
          Hello {props.user_name} 
          <GoPerson/>
        </div>
      </div><hr/>
    </div>
  );
}

export default Header;
