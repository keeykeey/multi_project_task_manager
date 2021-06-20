import './App.css'
import React from 'react';
import { CgMenuGridR } from 'react-icons/cg';
//https://react-icons.github.io/react-icons

interface Users{
  id: number
  name: string
}

const Header: React.FC<Users> = (props) =>{
  return (
    <div >
      <div className='row'>
        < CgMenuGridR className='menu' onClick={()=>console.log('pushed')}/>
        <div className='header-message'>Hello {props.name}</div>   
      </div>
    </div>
  );
}

export default Header;
