import React, { useState } from 'react';

interface Param{
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    mode: 'no-cors' | 'cors' | 'same-origin',
    credentials: 'include' | 'same-origin' | 'same-origin' | 'omit',
  }
  
function LogoutButton(){
    function logout(){
        const url: string = 'http://127.0.0.1:8080/logout'
        
        const param:Param = {
            method:'GET',
            mode:'cors',
            credentials:'include',
        }

        fetch(url,param)
        .then(res=>{
            console.log('see if fetch succeeded...',res)
        })
        .then(res=>window.location.href='http://127.0.0.1:3000')
        .catch(err=>console.log('err',err))
    }

    const defaultStyle:React.CSSProperties={
        borderRadius:'20px',
        border:'none',
        width:'80px',
        height:'30px',
        backgroundColor:'#4488f4',
        cursor:'pointer',
        fontSize:'14px',
    }

    const replacedStyle:React.CSSProperties={
        borderRadius:'20px',
        border:'none',
        width:'80px',
        height:'30px',
        backgroundColor:'#4488f4',
        cursor:'pointer',
        fontSize:'18px',
    }

    const [buttonStyle, setButtonStyle] = useState<React.CSSProperties>(defaultStyle)
    function hoverLogoutBtn(){
        setButtonStyle(replacedStyle)
    }
    function leaveLogoutBtn(){
        setButtonStyle(defaultStyle)
    }
 
    return(
        <div>
          <button style={buttonStyle} onClick={logout} onMouseEnter={hoverLogoutBtn} onMouseLeave={leaveLogoutBtn}>Logout</button>           
        </div>
    )
}

export default LogoutButton