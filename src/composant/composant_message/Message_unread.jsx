const Message_unread = ({nombre_message = 20}) => {
    return(
        <article className="introduction">
            <div className="introNombreMessage">
                <div className="titre">
                    <h3>Message</h3>
                </div>
                <div className="nombre">
                    <h3>{nombre_message}</h3>
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