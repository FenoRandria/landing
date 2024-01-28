import { useEffect, useState } from "react";
import { Link, NavLink, BrowserRouter as Router } from 'react-router-dom';
import Search_bar from "./Search_bar";
import CryptoJS from "crypto-js";

const Header = ({portefeuille=0}) => {
    const [activeLink, setActiveLink] = useState('accueil');
    const [statusEnligne, setStatusEnligne] = useState(0)
    const [nom, setNom] = useState('user')
    const token = sessionStorage.getItem("token");
    
    useEffect(() => {
        const fetchData = () => {
            const nom = sessionStorage.getItem("nom") ?? 'user';
            setNom(nom);
            const token = sessionStorage.getItem("token");
            if (token) {
                var lists = token.split("*,y+*");
                if (lists.length === 2 && lists[0].toString() === CryptoJS.SHA256(parseInt(lists[1])).toString()) {
                    setStatusEnligne(1);
                }
            }
        };
        fetchData();
        const intervalId = setInterval(fetchData, 500);
        return () => clearInterval(intervalId);
    }, []);

    const handleLinkClick = (link) => {
      setActiveLink(link);
    };
    const LogOut = () =>{
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("nom");
        setStatusEnligne(0);
        setNom('user');
    } 
    return(
            <header>
                <div className ="logo">
                    
                    <img src="../../src/assets/img/logoWhite.png" alt=""/>
                </div>
                <nav>
                    <div className ="menuNav">
                        <ul>
                            <li> <NavLink to="/accueil" style={{ textDecoration: 'none' }} className={activeLink === 'accueil' ? 'actif' : ''} onClick={() => handleLinkClick('accueil')}>Home</NavLink></li>
                            <li> <NavLink to="/list" style={{ textDecoration: 'none' }} className={activeLink === 'list' ? 'actif' : ''} onClick={() => handleLinkClick('list')}>List</NavLink></li>
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
                                statusEnligne === 0 ? (
                                <NavLink to="page/login">Log In</NavLink>
                                ) : (
                                <NavLink onClick={LogOut} to="/accueil">Log Out</NavLink>
                                )
                            }
                            </div>
                            <div className ="img">
                            {
                                statusEnligne === 0 ? (
                                    <img src="../../src/assets/img/logIn.png" alt="" />
                                    ) : (
                                    <img onClick={LogOut} src="../../src/assets/img/logOut.png" alt="" />
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