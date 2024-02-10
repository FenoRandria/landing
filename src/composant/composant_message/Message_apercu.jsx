const Message_apercu = ({className, nom, lastMessage, datemessage,onClicked}) => {
    
    function getEcartTime(dateHeureEnvoie) {
        const currentDate = new Date();
        const messageDate = new Date(dateHeureEnvoie);
        const timeDifferenceInSeconds = Math.floor((currentDate - messageDate) / 1000);
    
        if (timeDifferenceInSeconds < 0) {
            // The specified date is in the future
            return 'In the future';
        } else if (timeDifferenceInSeconds < 60) {
            return `${timeDifferenceInSeconds} seconds ago`;
        } else if (timeDifferenceInSeconds < 3600) {
            const minutes = Math.floor(timeDifferenceInSeconds / 60);
            return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
        } else if (timeDifferenceInSeconds < 86400) {
            const hours = Math.floor(timeDifferenceInSeconds / 3600);
            return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
        } else if (timeDifferenceInSeconds < 2592000) {
            const days = Math.floor(timeDifferenceInSeconds / 86400);
            return `${days} ${days === 1 ? 'day' : 'days'} ago`;
        } else if (timeDifferenceInSeconds < 31536000) {
            const months = Math.floor(timeDifferenceInSeconds / 2592000);
            return `${months} ${months === 1 ? 'month' : 'months'} ago`;
        } else {
            const years = Math.floor(timeDifferenceInSeconds / 31536000);
            return `${years} ${years === 1 ? 'year' : 'years'} ago`;
        }
    }
    
    
    return (
        <div className={className} onClick={onClicked}>
            {/* <a href="/message?receiver=1"> */}
                <div className="profile">
                    <img src="  /img/Fytahina.jpg" alt=""/>
                </div>
                <div className="texte">
                    <h1>{nom}</h1>
                    <p className="messageDernier">{lastMessage}</p>
                </div>
                <div className="hour">
                    <h4>{getEcartTime(datemessage)}</h4>
                </div>
            {/* </a> */}
        </div>
    );
};

export default Message_apercu;
