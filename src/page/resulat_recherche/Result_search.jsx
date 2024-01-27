import React from 'react';
import Terrain_card from "../../composant/composant_terrain/Terrain_card"
const Result_search = () => {
    const data = [
        {
            id:1,
            nb_parcelle:5
        },
        {
            id:2,
            nb_parcelle:9
        },
        {
            id:3,
            nb_parcelle:7
        },
        {
            id:4,
            nb_parcelle:3
        }
    ];
    return (
        <div className="resultatRecherchee">
            <div className="titre">
                <h1>Result
                 of <span>search</span></h1>
            </div>
            <div className="AllListe">
                {
                    data.map(terrain =>(
                        ( <Terrain_card  terrain_detail={terrain}/> )
                    ))
                }
            </div>
        </div>
    )
} 
export default Result_search;