import { useState } from "react";
import { Link, NavLink, BrowserRouter as Router } from 'react-router-dom';
import Search_bar from "./Search_bar";

const Header = ({nom='User', portefeuille=0, status=0}) => {
    const [activeLink, setActiveLink] = useState('accueil');

    const handleLinkClick = (link) => {
      setActiveLink(link);
    };
    return(
            <header>
                <div className ="logo">
                    
                    <img src="../../src/assets/img/logoWhite.png" alt=""/>
                </div>
                <nav>
                    <div className ="menuNav">
                        <ul>
                            <li> <NavLink to="/accueil" style={{ textDecoration: 'none' }} className={activeLink === 'accueil' ? 'actif' : ''} onClick={() => handleLinkClick('accueil')}>Home</NavLink></li>
                            <li> <NavLink to="/historique" style={{ textDecoration: 'none' }} className={activeLink === 'historique' ? 'actif' : ''} onClick={() => handleLinkClick('historique')}>Historique</NavLink></li>
                            <li> <NavLink to="/message" style={{ textDecoration: 'none' }} className={activeLink === 'message' ? 'actif' : ''} onClick={() => handleLinkClick('message')}>Message</NavLink></li>
                        </ul>
                    </div>
                    <Search_bar />
                    <div className ="profilOUt">
                        <div className ="profil">
                            <div className ="imageProfile">
                                <img src="../../src/assets/img/me.jpeg" alt=""/>
                            </div>
                            <div className ="infoProfile">
                                <h3>{nom}</h3>
                                <p>{portefeuille} Point</p>
                            </div>
                        </div>
                        <div className ="logOut">
                            <div className ="texte">
                            {
                                status === 0 ? (
                                <NavLink to="page/login">Log In</NavLink>
                                ) : (
                                <NavLink to="/accueil">Log Out</NavLink>
                                )
                            }
                            </div>
                            <div className ="img">
                            {
                                status === 0 ? (
                                <img src="../../src/assets/img/logOut.png" alt="" />
                                ) : (
                                <img src="../../src/assets/img/logIn.png" alt="" />
                                )
                            }
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
    )
}
export default Header;