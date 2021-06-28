import React, { useState,ChangeEvent }from 'react';
import './App.css';
import {FaEye} from 'react-icons/fa'


interface Props{
    id: number;
    name: string;
}

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
  
function Login(props:Props){
    const [userName,setUserName] = useState<string>('testuser1')
    const [userPassword,setUserPassword] = useState<string>('pwoftest1')
    const [pwHiding,setPwHiding] = useState<boolean>(true)

    type Mode = 'name' | 'password'

    function handleInputForm(event:ChangeEvent<HTMLInputElement>,mode:Mode){
        //https://qiita.com/natsuhiko/items/5d2a526a217e05162a0a
        if (mode==='name'){
            setUserName(event.target.value)
        }else if(mode==='password'){
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
            console.log('see if fetch succeeded...',res)
        })
    }

    return(
        <div>
            <h1>Login Page</h1><hr/>
            <ul>
                <input onChange={(e)=>handleInputForm(e,'name')} 
                       placeholder='name'/><br/>
                <input type={pwHiding?'password':'text'} 
                       onChange={(e)=>handleInputForm(e,'password')}
                       placeholder='password'/>
                    <FaEye className='FaEye' onClick={handlePwHiding}/><br/>
                <button onClick={userLogin}>Login</button>
            </ul>
            
        </div>
    )
}

export default Login