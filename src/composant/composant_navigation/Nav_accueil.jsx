import { NavLink } from "react-router-dom";
import { Color } from "three";

const Nav_accueil = () => {
    return (
        <article className="navigation">
            <div className="miniTitre">
                <h3>About</h3>
            </div>
            <div className="allNavigation">
                <NavLink style={{color:"white",  width: "100%", height: "50px"}} to="/historique">
                    <div className="navig">
                        <div className="texte">
                            <h5>Historique des terrains</h5>
                        </div>
                        <div className="rond"></div>
                    </div>
                </NavLink>
                <NavLink style={{color:"white",  width: "100%", height: "50px"}} to="/message">
                    <div className="navig">
                        <div className="texte">
                            <h5>Message</h5>
                        </div>
                        <div className="rond"></div>
                    </div>
                </NavLink>
                
                <NavLink style={{color:"white",    width: "100%", height: "50px"}} to="/historique">
                    <div className="navig">
                        <div className="texte">
                            <h5>Historique des terrains</h5>
                        </div>
                        <div className="rond"></div>
                    </div>
                </NavLink>

            </div>
        </article>
    )
}
export default Nav_accueil;