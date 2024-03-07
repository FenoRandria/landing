import React, { useEffect, useState } from 'react';
import FicheTerrain from '../../composant/ficheTerrain/FicheTerrain';
import apiUrl from '../../apiUrl';
const Terrain = () =>
{

        const [data, setData] = useState([]);
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch(`${apiUrl}/api/parcelles/categories/terrain`, {
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
         <div className="titre" style={{position:"sticky"}}>
            <h1>Fiche
                des <span>terrains</span></h1>
        </div>
        <div className="AllListe">
            {   
                data.map((mamay,index) =>(
                    (<FicheTerrain key={index} nomcategorie={mamay.nomcategorie} id_parcelle={mamay.id_categorie_culture} id_terrain={mamay.corbeille} />)
                ))
            }
        </div>
    </div>
    
 )
}
export default Terrain;
