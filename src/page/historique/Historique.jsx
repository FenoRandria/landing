import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Terrain_card from '../../composant/composant_terrain/Terrain_card';
import Auth_token from '../../Auth_token';
import apiUrl from '../../apiUrl';
const Historique = () =>
{
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/terrains`, {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error(`Error in API call: ${response.status} ${response.statusText}`);
                }

                const responseData = await response.json();
                console.log('Data from API:', responseData.data); // Vérifiez les données ici
                setData(responseData.data);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
    }, []);

 return (
    <div className="historique">
        <Auth_token/>
         <div className="titre">
            <h1>Historique
                des <span>terrains</span></h1>
        </div>
        <div className="AllListe" style={{ height:'400px'}}>
            {
                data?.map((terrain,index) =>(
                    ( <Terrain_card  key={index} terrain_detail={terrain}/> )
                ))
            }
        </div>
    </div>
    
 )
}
export default Historique;
