import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Terrain_card from '../../composant/composant_terrain/Terrain_card';
import Auth_token from '../../Auth_token';
const Historique = () =>
{
    const data = [
        {
            id:11,
            nb_parcelle:0
        },
        {
            id:25,
            nb_parcelle:2
        },
        {
            id:3,
            nb_parcelle:7
        },
        {
            id:41,
            nb_parcelle:5
        }
    ];
 return (
    <div className="historique">
        <Auth_token/>
         <div className="titre">
            <h1>Historique
                des <span>terrains</span></h1>
        </div>
        <div className="AllListe" style={{ height:'400px'}}>
            {
                data.map(terrain =>(
                    ( <Terrain_card  terrain_detail={terrain}/> )
                ))
            }
        </div>
    </div>
    
 )
}
export default Historique;
