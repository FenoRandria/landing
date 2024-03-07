const Terrain_card = ({terrain_detail = {id_terrain:0, id_proprietaire:0}}) => {
    return (
        <div className="liste">
            <div className="img">
                <img src="/img/tarainResult.jpg" alt=""/>
            </div>
            <div className="contenu">
                <div className="terrain">
                    <h3>Terrain <span>{terrain_detail.id_terrain}</span></h3>
                </div>
                <div className="parcelle">
                    <div className="miniTitre">
                        <h3>Ref. Proprietaire: <span>{terrain_detail.id_proprietaire}</span></h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Terrain_card;