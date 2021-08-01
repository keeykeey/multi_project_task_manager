import React, { useState, ChangeEvent }from 'react';
import { Link } from 'react-router-dom';
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
    email: string;
}

interface FunctionModeChange {
    css: 'default' | 'onCursor',
    text:'name' | 'password' | 'email'
}

function CreateAccount(){
    const cssRow:React.CSSProperties={
        display:'flex',
        flexDirection:'row',
        width:'202px'
    }

    /*
        名前入力フォーム
    */
    const default1:React.CSSProperties={
        outline:'none',
        width:'200px',
        height:'30px',
        fontSize:'18px',
        borderWidth:'1px 1px 1px 1px',
        borderRadius:'5px',
        margin:'1px 0px 1px 0px',
    }     

    const onCursor1:React.CSSProperties={
        outline:'none',
        width:'198px',
        height:'28px',
        fontSize:'18px',
        borderWidth:'2px 2px 2px 2px',
        borderRadius:'5px',
        margin:'1px 0px 1px 0px',
    } 

    const [textInputStyle,setTextInputStyle] = useState<React.CSSProperties>(default1)
    function giveTextInputCssStyle(mode:FunctionModeChange["css"]){

        switch (mode){
            case 'default':
                setTextInputStyle(default1)
                break;
            case 'onCursor':
                setTextInputStyle(onCursor1)
                break;
            default:
                break;
        }        
    }    

    /*
        PW入力フォーム
    */
    const default2:React.CSSProperties={
        outline:'none',
        width:'180px',
        height:'30px',
        fontSize:'18px',
        borderWidth:'1px 0px 1px 1px',
        borderRadius:'5px 0px 0px 5px',
        margin:'1px 0px 1px 0px',
    }

    const onCursor2:React.CSSProperties={
        outline:'none',
        width:'178px',
        height:'28px',
        fontSize:'18px',
        borderWidth:'2px 0px 2px 2px',
        borderRadius:'5px 0px 0px 5px',
        margin:'1px 0px 1px 0px',
    }

    const [pwInputStyle,setPwInputStyle]=useState<React.CSSProperties>(default2)
    function givePwInputCssStyle(mode:FunctionModeChange["css"]){
        switch (mode){
            case 'default':
                setPwInputStyle(default2)
                break;
            case 'onCursor':
                setPwInputStyle(onCursor2)
                break;
            default:
                break;
        }        
    }  
    
    /*
        PWマスクアイコン
    */
    const default3:React.CSSProperties={
        fontSize:'16px',
        width:'20px',
        height:'32px',
        margin:'1px 0px 1px 0px',
        borderRadius:'0px 5px 5px 0px',
        borderWidth:'1px 1px 1px 0px',
        borderStyle:'solid',
        borderColor:'#000000 #30303099 #30303099 #ffffff',
    }
    const onCursor3:React.CSSProperties={
        fontSize:'16px',
        width:'18px',
        height:'30px',
        margin:'1px 0px 1px 0px',
        borderRadius:'0px 5px 5px 0px',
        borderWidth:'2px 2px 2px 0px',
        borderStyle:'solid',
        borderColor:'#000000 #30303099 #30303099 #ffffff',
    }
    const [iconEyeStyle,setIconEyeStyle]=useState<React.CSSProperties>(default3)
    function giveIconEyeCssStyle(mode:FunctionModeChange["css"]){
        switch (mode){
            case 'default':
                setIconEyeStyle(default3)
                break;
            case 'onCursor':
                setIconEyeStyle(onCursor3)
                break;
            default:
                break;
        }        
    }  
    
    const cssEye:React.CSSProperties={
        margin:'8px 0px 8px auto',
        cursor:'pointer',
    }
    const [pwHiding,setPwHiding] = useState<boolean>(true)
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

    /*
        メールアドレス入力フォーム
    */
    const default4:React.CSSProperties={
        outline:'none',
        width:'200px',
        height:'30px',
        fontSize:'18px',
        borderWidth:'1px 1px 1px 1px',
        borderRadius:'5px',
        margin:'1px 0px 1px 0px',
    }

    const onCursor4:React.CSSProperties={
        outline:'none',
        width:'198px',
        height:'28px',
        fontSize:'18px',
        borderWidth:'2px 2px 2px 2px',
        borderRadius:'5px',
        margin:'1px 0px 1px 0px',
    } 

    const [emailInputStyle,setEmailInputStyle] = useState<React.CSSProperties>(default4)
    function giveEmailInputCssStyle(mode:FunctionModeChange["css"]){
        switch(mode){
            case 'default':
                setEmailInputStyle(default4)
                break;
            case 'onCursor':
                setEmailInputStyle(onCursor4)
                break;
            default:
                break;
        }
    }

    /*
        LOGIN ボタン
    */
    const default5:React.CSSProperties={
        width:202,
        height:30,
        borderRadius:'5px',
        borderWidth:'1px 1px 1px 1px',
        borderColor:'#000000 #30303099 #30303099 #000000',
        backgroundColor:'#4488f4ee',
        cursor:'pointer',
    }

    const onCursor5:React.CSSProperties={
        width:202,
        height:30,
        borderRadius:'5px',
        borderWidth:'1px 1px 1px 1px',
        borderColor:'#000000 #30303099 #30303099 #000000',
        backgroundColor:'#4488f4',
        cursor:'pointer',
    }

    const [loginButtonStyle,setLoginButtonStyle] = useState<React.CSSProperties>(default5)
    function giveLoginButtonCssStyle(mode:FunctionModeChange["css"]){
        switch (mode){
            case 'default':
                setLoginButtonStyle(default5)
                break;
            case 'onCursor':
                setLoginButtonStyle(onCursor5)
                break;
            default:
                break;
        }        
    }

    function createAccount(){
        const url: string = 'http://127.0.0.1:8080/postusers'
        const input_form:InputForm = {
            name: userName,
            password: userPassword,
            email: userEmail,
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
        })
        .then(res=>window.location.href='http://127.0.0.1:3000')
        .catch(err=>console.log('err',err))
    }

    /*
        CREATE ACCOUNT ボタン
    */
    const default6:React.CSSProperties={
        outline:'none',
        margin:'50px auto auto auto',
        width:202,
        height:30,
        borderRadius:'5px',
        borderWidth:'1px 1px 1px 1px',
        borderColor:'#000000 #30303099 #30303099 #000000',
        backgroundColor:'#dfdfdfbb',
        cursor:'pointer',
    }

    const onCursor6:React.CSSProperties={
        outline:'none',
        margin:'50px auto auto auto',
        width:202,
        height:30,
        borderRadius:'5px',
        borderWidth:'1px 1px 1px 1px',
        borderColor:'#000000 #30303099 #30303099 #000000',
        backgroundColor:'#dfdfdf',
        cursor:'pointer',
    }

    const [createAccountStyle,setCreateAcountStyle] = useState<React.CSSProperties>(default6)
    function giveCreateAccountStyle(mode:FunctionModeChange["css"]){
        switch(mode){
            case 'default':
                setCreateAcountStyle(default6)
                break;
            case 'onCursor':
                setCreateAcountStyle(onCursor6)
                break;
            default:
                break;
        }
    }
    
    /*
        HANDLE TEXT, PW & EMAIL INPUT
    */
    const [userName,setUserName] = useState<string>('')
    const [userPassword,setUserPassword] = useState<string>('')
    const [userEmail,setUserEmail] = useState<string>('')

    function handleInputForm(event:ChangeEvent<HTMLInputElement>,mode:FunctionModeChange["text"]){
        //https://qiita.com/natsuhiko/items/5d2a526a217e05162a0a
        switch(mode){
            case 'name':
                setUserName(event.target.value)
                break;
            case 'password':
                setUserPassword(event.target.value)
                break;
            case 'email':
                setUserEmail(event.target.value)
                break;
        }
    }

    return(
        <div onClick={()=>{
                giveTextInputCssStyle('default')
                givePwInputCssStyle('default')
                giveIconEyeCssStyle('default')}}
        >
            <ul >
                <h2>Create Account</h2>
                <div style={cssRow} onClick={(e)=>e.stopPropagation()}>
                    <input style={textInputStyle}
                           onClick={()=>giveTextInputCssStyle('onCursor')}
                           onChange={(e)=>handleInputForm(e,'name')} 
                           placeholder='name'/><br/>
                </div>
                <div style={cssRow} onClick={(e)=>e.stopPropagation()}>
                    <input type={pwHiding?'password':'text'} 
                           style={pwInputStyle}
                           onClick={(e)=> {
                               givePwInputCssStyle('onCursor')
                               giveIconEyeCssStyle('onCursor')
                           }}
                           onChange={(e)=>handleInputForm(e,'password')}
                           placeholder='password'/>
                    <div style={iconEyeStyle}>
                        {pwHiding?<FaEye style={cssEye} onClick={handlePwHiding}/>:<FaEyeSlash style={cssEye} onClick={handlePwHiding}/>}         
                    </div>
                </div>
                <div style={cssRow} onClick={(e)=>e.stopPropagation()}>
                    <input style={emailInputStyle}
                           onClick={()=>giveEmailInputCssStyle('onCursor')}
                           onChange={(e)=>handleInputForm(e,'email')}
                           placeholder='email'/>
                </div>
                <button style={loginButtonStyle} 
                        onMouseEnter={()=>giveLoginButtonCssStyle('onCursor')}
                        onMouseLeave={()=>giveLoginButtonCssStyle('default')}
                        onClick={createAccount}>Create Account</button>
                <br/>
                <Link to = '/'>
                    <button style={createAccountStyle} 
                        onMouseEnter={()=>giveCreateAccountStyle('onCursor')}
                        onMouseLeave={()=>giveCreateAccountStyle('default')}
                        >ログインページへ</button>
                </Link>
            </ul>
        </div>
    )
}

export default CreateAccount