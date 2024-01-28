const Message_unread = ({nombre_membre = 20}) => {
    return(
        <article className="introduction">
            <div className="introNombreMessage">
                <div className="titre">
                    <h3>Membre(s)</h3>
                </div>
                <div className="nombre">
                    <h3>{nombre_membre}</h3>
                </div>
                <div className="membre">
                    <div className="mini-logo"></div>
                    <div className="image"></div>
                </div>
            </div>
            <div className="slogan">
                <h1>Connect  with<span> your friends</span> easely</h1>
            </div>
            <div className="slogan2">
                <h1>Expand your lands</h1>
            </div>
        </article>
    )
} 
export default Message_unread;