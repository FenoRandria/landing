const Terrain_card = ({terrain_detail = {id:0, nb_parcelle:0}}) => {
    return (
        <div className="liste">
            <div className="img">
                <img src="../../src/assets/img/tarainResult.jpg" alt=""/>
            </div>
            <div className="contenu">
                <div className="terrain">
                    <h3>Terrain <span>{terrain_detail.id}</span></h3>
                </div>
                <div className="parcelle">
                    <div className="miniTitre">
                        <h3>Parcelle: <span>{terrain_detail.nb_parcelle}</span></h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Terrain_card;