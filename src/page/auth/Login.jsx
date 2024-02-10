import React, { useState } from "react";
import apiUrl from '../../apiUrl';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError,setShowError] = useState('');
  const history = useNavigate();
  const seLogin = () => {
    console.log(email+" + "+password)
    fetch(`${apiUrl}/api/proprietaires/login`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        mail: email,
        mdp: password,
      }),
    })
      .then(response => {
        console.log(response.status)
        if (!response.ok) {
          if (response.status==500) {
            return response.json().then(errorData => {
              setShowError(errorData.message || 'incorrect mail or password') ;
              throw new Error(showError);
            });
          }
          throw new Error('Login failed ,');
        }
        return response.json();
      })
      .then(data => {
        console.log('Login successful:', data);
        sessionStorage.setItem('token',data.data);
        history("/message");
      })
      .catch(error => {
        console.error('Login error:', error.message);
      });
  };
  const toRegister =()=>{
    history('/page/register')
  }
    return (
        <div className="login">
            <div className="Vide"></div>
            <div className="formulaire_login">
                <div className="cloudAnimation">
                    <div className="imageCloud1">
                        <img src="../../src/assets/img/Nuage.png" alt=""/>
                    </div>
                    <div className="texte">
                        <h1>Login</h1>
                    </div>
                    <div className="imageCloud2">
                        <img src="../../src/assets/img/Nuage.png" alt=""/>
                    </div>
                </div>
                
                <form onSubmit={(e) => { e.preventDefault(); seLogin(); }}>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="" id="1" placeholder="Email*" required/>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="" id="2" placeholder="Password*" required/>
                    <p style={{color:'red', margin:'0'}}>{showError}</p>
                    <div className="forgotPass">
                        <p><a href="#">Forgot Your Password</a></p>
                    </div>
                    <button type="submit">
                        <p>Log In</p>
                    </button>
                    <div className="dontHave">
                        <p onClick={toRegister}>Don't have an account?<a onClick={toRegister}  href="#">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
} 
export default Login;