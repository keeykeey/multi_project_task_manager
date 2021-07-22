import React, { useState,ChangeEvent }from 'react';
import './App.css';
import {FaEye, FaEyeSlash} from 'react-icons/fa'

interface Param  {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    mode: 'no-cors' | 'cors' | 'same-origin',
    credentials: 'include' | 'same-origin' | 'same-origin' | 'omit',
    headers:{'Content-Type':'application/json' | 'text/html' |'multipart/form-data'},
    body: string
}

interface InputForm {
    name: string;
    password: string;
}

function Login(){
    const cssRow:React.CSSProperties={
        display:'flex',
        flexDirection:'row'
    }
      
    const cssTextInput:React.CSSProperties={
        width:'200px',
        height:'30px',
        fontSize:'18px',
        borderWidth:'1px 1px 1px 1px',
        borderRadius:'5px',
        margin:'1px 0px 1px 0px',
    }
      
    const cssPwInput:React.CSSProperties={
        width:'180px',
        height:'30px',
        fontSize:'18px',
        borderWidth:'1px 0px 1px 1px',
        borderRadius:'5px 0px 0px 5px',
        margin:'1px 0px 1px 0px',
    }
      
    const cssEyeDiv:React.CSSProperties={
        fontSize:'16px',
        width:'20px',
        height:'32px',
        margin:'1px 0px 1px 0px',
        borderRadius:'0px 5px 5px 0px',
        borderWidth:'1px 1px 1px 0px',
        borderStyle:'solid',
        borderColor:'#000000 #30303099 #30303099 #ffffff',
    }
      
    const cssEye:React.CSSProperties={
        margin:'8px 0px 8px auto',
        cursor:'pointer',
    }

    const cssLoginButton:React.CSSProperties={
        width:205.5,
        height:30,
        borderRadius:'5px',
        borderWidth:'1px 1px 1px 1px',
        borderColor:'#000000 #30303099 #30303099 #000000',
        backgroundColor:'#4488f4'
    }
      

    const [userName,setUserName] = useState<string>('testuser1')
    const [userPassword,setUserPassword] = useState<string>('pwoftest1')
    const [pwHiding,setPwHiding] = useState<boolean>(true)

    type Mode = 'name' | 'password'

    function handleInputForm(event:ChangeEvent<HTMLInputElement>,mode:Mode){
        //https://qiita.com/natsuhiko/items/5d2a526a217e05162a0a
        switch(mode){
            case 'name':
                setUserName(event.target.value)
                break;
            case 'password':
                setUserPassword(event.target.value)
        }
    }

    function handlePwHiding(){
        switch (pwHiding){
            case true:
                setPwHiding(false);
                break;
            case false:
                setPwHiding(true);
                break;
        }
    }

    function userLogin(){
        const url: string = 'http://127.0.0.1:8080/auth'
        const input_form:InputForm = {
            name: userName,
            password: userPassword
        }
        
        const param:Param = {
            method:'POST',
            mode:'cors',
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(input_form)
        }

        fetch(url,param)
        .then(res=>{
            console.log('success...',res)
        }).then(res=>window.location.href='http://127.0.0.1:3000')
    }

    return(
        <div>
            <ul>
                <input style={cssTextInput}
                       onChange={(e)=>handleInputForm(e,'name')} 
                       placeholder='name'/><br/>
                <div style={cssRow}>
                  <input type={pwHiding?'password':'text'} 
                         style={cssPwInput}
                         onChange={(e)=>handleInputForm(e,'password')}
                         placeholder='password'/>
                  <div style={cssEyeDiv}>
                    {pwHiding?<FaEye style={cssEye} onClick={handlePwHiding}/>:<FaEyeSlash style={cssEye} onClick={handlePwHiding}/>}         
                  </div>
                </div>
                <button style={cssLoginButton} onClick={userLogin}>Login</button>
            </ul>
            
        </div>
    )
}

export default Login