import React, { useState } from "react";
import apiUrl from '../../apiUrl';
 
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [nom, setNom] = useState('');
  const [mail, setMail] = useState('');
  const [dtn, setDtn] = useState('');
  const [mdp, setMdp] = useState('');
  const [cmdp, setCmdp] = useState('');
  const [showError,setShowError] = useState('');
  const history = useNavigate();
  const seRegister = () => {
    console.log(mail+" + "+mdp)
    fetch(`${apiUrl}/api/proprietaires/inscrire`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        nom:nom,
        mail: mail,
        dtn: dtn,
        mdp: mdp,
        cmdp: cmdp
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
          throw new Error('Register failed ,');
        }
        return response.json();
      })
      .then(data => {
        console.log('Register successful:', data);
        alert('register valid')
        history("/page/login");
      })
      .catch(error => {
        console.error('Register error:', error.message);
      });
  };
  const toLogin =()=>{
    history('/page/login')
  }
    return (
        <div className="login">
            <div className="Vide"></div>
            <div className="formulaire_login">
                <div className="cloudAnimation" style={{height:'230px'}}>
                    <div className="imageCloud1">
                        <img src="  /img/Nuage.png" alt=""/>
                    </div>
                    <div className="texte">
                        <h1 style={{fontSize:'7rem'}}>Sign Up</h1>
                    </div>
                    <div className="imageCloud2">
                        <img src="  /img/Nuage.png" alt=""/>
                    </div>
                </div>
                
                <form onSubmit={(e) => { e.preventDefault(); seRegister(); }}>
                    <input value={nom} onChange={(e) => setNom(e.target.value)} type="text" name="nom" id="1" placeholder="nom*" required/>
                    <input value={mail} onChange={(e) => setMail(e.target.value)} type="email" name="mail" id="2" placeholder="e-mail*" required/>
                    <input value={dtn} onChange={(e) => setDtn(e.target.value)} type="date" name="dtn" id="2" required/>
                    <input value={mdp} onChange={(e) => setMdp(e.target.value)} type="password" name="mdp" id="3" placeholder="Password*" required/>
                    <input value={cmdp} onChange={(e) => setCmdp(e.target.value)} type="password" name="cmdp" id="4" placeholder="Retype password*" required/>

                    <p style={{color:'red', margin:'0'}}>{showError}</p>
                    {/* <div className="forgotPass">
                        <p><a href="#">Forgot Your Password</a></p>
                    </div> */}
                    <div className="dontHave">
                        <p onClick={toLogin}>Existing an account?<a onClick={toLogin}  href="#">Sign In</a></p>
                    </div>
                    <button type="submit">
                        <p>Register</p>
                    </button>
                </form>
            </div>
        </div>
    )
} 
export default Register;

