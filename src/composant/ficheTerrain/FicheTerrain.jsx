import "./FicheTerrain.css";

const FicheTerrain = (props) => {

    return (
        <section className="fichier">
            <div className="fichierOne">
                <div className="image" style={{backgroundImage: 'url(/img/NftBanner1.png)'}}>
                    <div className="texte">
                        <h1>Crop 
                            Sheet</h1>
                    </div>
                </div>
                <div className="typeCulture">
                    <div className="nom">
                        <h2>{props.nomcategorie}</h2>
                        <p>Sweet, curved yellow fruit or legume</p>
                    </div>
                    <div className="partielle">
                        <h4>{props.id_parcelle}</h4>
                    </div>
                </div>
                <div className="terrain">
                    <h1>Terrain-{props.id_terrain}</h1>
                </div>
            </div>
        </section>
    );
}
export default FicheTerrain;




            



    
