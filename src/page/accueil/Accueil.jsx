// import React, { useState } from 'react';

import Nav_accueil from "../../composant/composant_navigation/Nav_accueil";
import Video_youtube from "../../composant/video/Video_youtube";

// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
const Accueil = () =>
{
 return (
   
    <div className="accueil">
            <section className="image3D">
                <div className="imgSecour">
                    <img src="../../src/assets/img/photo_Accueil.png" alt=""/>
                    {/* <Video_youtube /> */}
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