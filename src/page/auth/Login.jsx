const Login = () => {
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
                <form action="" method="post">
                    <input type="text" name="" id="" placeholder="Email" required/>
                    <input type="password" name="" id="" placeholder="Password" required/>
                    <div className="forgotPass">
                        <p><a href="#">Forgot Your Password</a></p>
                    </div>
                    <button>
                        <p>Log In</p>
                    </button>
                    <div className="dontHave">
                        <p>Don't have an account?<a href="#">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
} 
export default Login;