// import React, { useState } from 'react';

import Nav_accueil from "../../composant/composant_navigation/Nav_accueil";

// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
const Accueil = () =>
{
 return (
   
    <div className="accueil">
            <section className="image3D">
                <div className="imgSecour">
                    <img src="/img/photo_Accueil.png" alt=""/>
                </div>
            </section>
            <section className="Contenu">
                <article className="titre">
                    <h1><span> FORGE </span>
                        YOUR 
                        EMPIRE</h1>
                </article>
                <Nav_accueil></Nav_accueil>
            </section>
        </div>
        
       
    );
};
export default Accueil;