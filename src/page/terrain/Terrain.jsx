import React, { useState } from 'react';
import FicheTerrain from '../../composant/ficheTerrain/FicheTerrain';
const Terrain = () =>
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
         <div className="titre" style={{position:"sticky"}}>
            <h1>Fiche
                des <span>terrains</span></h1>
        </div>
        <div className="AllListe">
            {
                data.map(terrain =>(
                    (<FicheTerrain  />)
                ))
            }
        </div>
    </div>
    
 )
}
export default Terrain;
