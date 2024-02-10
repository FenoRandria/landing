import React, { useEffect, useState } from 'react';
import Message_unread from '../../composant/composant_message/Message_unread';
import Message_apercu from '../../composant/composant_message/Message_apercu';
import apiUrl from '../../apiUrl';
const Message = () => {
const [lastMessagerie, setLastMessagerie] = useState([]);
const [discussions, setDiscussions] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [elementActif, setElementActif] = useState(0);
const [nomReceiver, setNomReceiver] = useState(null);
const [idReceveur,setIdReceveur] = useState();
const [idEnvoyeur,setIdEnvoyeur] = useState();
const [proprietaires,setProprietaires] = useState([]);
const [hafatra,setHafatra]=useState('');

useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (!token) {
        console.error("Token not available");
        window.location.href="/page/login"
        return;
    }

    fetch(`${apiUrl}/api/proprietaires/auth`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8"
        },
    })
    .then(response => {
        if (!response.ok) {
            console.error("Error in API call:", response.status, response.statusText);
            return Promise.reject("Authentication failed");
        }
        return response.json();
    })
    .then(data => {
        console.log("Response data:", data.data);
        parseInt(data.data)
        setIdEnvoyeur(data.data)
    })
    .catch(error => {
        console.error("Error:", error);
        window.location.href="/page/login"

    });
}, []);



function formatDateTime(dateTimeString) {
    const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date(dateTimeString));
    return formattedDate.toUpperCase();
}

const CallAPI = () => {
    setLoading(true);
    fetch(`${apiUrl}/api/proprietaires`, 
    {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token').toString()}`,
            "Content-type": "application/json; charset=UTF-8"
            },
    })
    .then(response => {
        console.log(response.status);
        if (!response.ok) {
            if (response.status === 500) {
                return response.json().then(errorData => {
                    setError(errorData.message);
                    throw new Error(errorData.message);
                });
            }
            throw new Error('Failed in list messages');
        }
        return response.json();
    })
    .then(data => {
        console.log('proprietaires:', data.data);
        setProprietaires(data.data)
    })
    .catch(error => {
        console.error('API Error:', error.message);
        setError('Failed to fetch data');
    })
    .finally(() => {
        setLoading(false);
    }); 

    fetch(`${apiUrl}/api/proprietaires/discussions/last/${sessionStorage.getItem('token').toString()}`, 
    {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token').toString()}`,
            "Content-type": "application/json; charset=UTF-8"
            },
    })
    .then(response => {
        console.log(response.status);
        if (!response.ok) {
            if (response.status === 500) {
                return response.json().then(errorData => {
                    setError(errorData.message);
                    throw new Error(errorData.message);
                });
            }
            throw new Error('Failed in list messages');
        }
        return response.json();
    })
    .then(data => {
        console.log('Successful:', data.data);
        setLastMessagerie(data.data);
    })
    .catch(error => {
        console.error('API Error:', error.message);
        setError('Failed to fetch data');
    })
    .finally(() => {
        setLoading(false);
    });         
};

function getDiscussions() {
    fetch(`${apiUrl}/api/proprietaires/discussions`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token').toString()}`,
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            idEnvoyeur:idEnvoyeur,
            idReceveur:idReceveur
        }),
        // credentials: 'include',
    })
    .then(response => {
        console.log(response.status);
        if (!response.ok) {
            if (response.status === 500) {
                return response.json().then(errorData => {
                    setError(errorData.message);
                    throw new Error(errorData.message);
                });
            }
            throw new Error('Failed in list messages');
        }
        return response.json();
    })
    .then(data => {
        console.log("receveur: "+idReceveur+" sender: "+idEnvoyeur)
        console.log('Successful discusions:', data.data);
        setDiscussions(data.data);
    })
    .catch(error => {
        console.error('API Error:', error.message);
        setError('Failed to fetch data');
    })
    .finally(() => {
        setLoading(false);
    });   
}

useEffect(() => {
    CallAPI();
    if(idEnvoyeur !==null && idReceveur!==null && idEnvoyeur !== undefined && idReceveur !== undefined){
        getDiscussions();
    }
}, [idEnvoyeur,idReceveur]);

if (loading) {
    return <div>Loading...</div>;
}
if (error) {
    return <div>Error: {error}</div>;
};

const sendHafatra = () => {
    if (hafatra && hafatra.trim() !== "") { 
    fetch(`${apiUrl}/api/proprietaires/messagerie`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token').toString()}`,
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        message:hafatra,
        idEnvoyeur: idEnvoyeur,
        idReceveur: idReceveur,
        status: 1
      }),
    })
      .then(response => {
        console.log(response.status)
        if (!response.ok) {
          if (response.status==500) {
            return response.json().then(errorData => {
              setShowError(errorData.message) ;
              throw new Error(showError);
            });
          }
          throw new Error('Register failed ,');
        }
        return response.json();
      })
      .then(data => {
        console.log('send message successful:', data);
      })
      .catch(error => {
        console.error('message error:', error.message);
      });
      setHafatra('');

    }
};
// ------------------------------------------------
 return (
    <section className="messenger">
        {/* <Auth_token/> */}
        <Message_unread nombre_membre ={proprietaires?.length-1} />
        <article className="chat">
            <div className="recent">
                <div className="titre">
                    <h2>Recent</h2>
                </div>
                <div className="AllMessage">
                    {
                        lastMessagerie.map((messagerie, index) =>  {
                            if (parseInt(messagerie.envoyeur.id) !== parseInt(idEnvoyeur)) {
                                return (<Message_apercu
                                    key={index}
                                    className={`messageOne ${index === elementActif ? 'active' : ''}`}
                                    nom={messagerie.envoyeur.nom}
                                    lastMessage={messagerie.messagerie.message}
                                    datemessage={messagerie.messagerie.dateHeureEnvoie}
                                    onClicked={(e) => {
                                        e.preventDefault();
                                        console.log("Clicked:", messagerie.envoyeur.id);
                                        setNomReceiver(messagerie.envoyeur.nom);
                                        setIdReceveur(messagerie.envoyeur.id);
                                        setElementActif(index);
                                    }}    
                                    type="submit"                            
                                />)
                        }})
                        
                    }
                    {
                        proprietaires.map((proprietaire, index) =>  {
                            console.log(proprietaire.id)
                            const idNotFoundInLastMessagerie = lastMessagerie.every(messagerie => parseInt(messagerie.envoyeur.id) !== parseInt(proprietaire.id));
                            if (idNotFoundInLastMessagerie) {
                            if (parseInt(proprietaire.id) !== parseInt(idEnvoyeur)) {
                                return (<Message_apercu
                                    key={index}
                                    className={`messageOne`}
                                    nom={proprietaire.nom}
                                    lastMessage="start message"
                                    // datemessage={"now"}
                                    onClicked={(e) => {
                                        e.preventDefault();
                                        console.log("Clicked:", proprietaire.id);
                                        setNomReceiver(proprietaire.nom);
                                        setIdReceveur(proprietaire.id);
                                        setElementActif(index);
                                    }}    
                                    type="submit"                            
                                />)
                        } }  })
                    }
                </div>
            </div>
            <div className="detailsMessage">
                <div className="headerMessage">
                    <div className="infoProfile">
                        <div className="profile">
                            <img src="/img/valiha.jpg" alt=""/>
                        </div>
                        <div className="texte">
                            <h1>{nomReceiver}</h1>
                            <p className="statu">Actif <span><img src="" alt=""/></span></p>
                        </div>
                    </div>
                </div>

                <div className="allCommChat">
                    { 
                        discussions?.slice()?.reverse()?.map((discussions, index) => {
                            if (parseInt(discussions.envoyeur.id) === parseInt(idEnvoyeur)) {
                                return (
                                    <div className="sender" key={index}>
                                        <div className="pdp">
                                            <img src="/img/valiha.jpg" alt="pdp" />
                                        </div>
                                        <div className="soratra">
                                            <p>{discussions.messagerie.message}</p>
                                            <h4>{formatDateTime(discussions.messagerie.dateHeureEnvoie)}</h4>
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <div className="recever" key={index}>
                                        <div className="pdp">
                                            <img src="/img/Fytahina.jpg" alt="pdp"/>
                                        </div>
                                        <div className="soratra">
                                            <p>{discussions.messagerie.message}</p>
                                            <h4>{formatDateTime(discussions.messagerie.dateHeureEnvoie)}</h4>
                                        </div>
                                    </div>
                                );
                            } 
                        })
                    }

                </div>

                <div className="textField">
                    <form onSubmit={(e) => { e.preventDefault(); sendHafatra(); getDiscussions(); }}>
                        <input value={hafatra} type="text" name="message" onChange={(e) => setHafatra(e.target.value)} id="" placeholder="Your Message...."/>
                        <button type='submit'>
                            <svg id="senderIcon" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.14 19.14">
                                <defs>
                                </defs>
                                <g id="ELEMENTS">
                                    <g>
                                    <path className="cls-1" d="m17.34.18c-.51-.19-1.08-.24-1.67-.08L2.05,3.74c-2.46.66-2.79,4.02-.5,5.14l4.91,2.16L17.34.18Z"/>
                                    <path className="cls-1" d="m15.4,17.1l3.65-13.62c.16-.59.11-1.16-.08-1.67l-10.88,10.88,2.16,4.91c1.12,2.29,4.48,1.97,5.14-.5Z"/>
                                    </g>
                                </g>
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </article>
        </section>
 )
}
export default Message;