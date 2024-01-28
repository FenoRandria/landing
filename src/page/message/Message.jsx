import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, useNavigate } from 'react-router-dom';
import Message_unread from '../../composant/composant_message/Message_unread';
import Auth_token from '../../Auth_token';
import Message_apercu from '../../composant/composant_message/Message_apercu';
import apiUrl from '../../apiUrl';
import CryptoJS from 'crypto-js';
const Message = () => {
const [lastMessagerie, setLastMessagerie] = useState([]);
const [discussions, setDiscussions] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [elementActif, setElementActif] = useState(0);
const [nomReceiver, setNomReceiver] = useState(null);
const [idReceveur,setIdReceveur] = useState(null);
const [idEnvoyeur,setIdEnvoyeur] = useState();
const [hafatra,setHafatra]=useState('');
const [isState,setIsState]=useState(0);

const history = useNavigate();
useEffect(()=>{
    groupF();
},[])

// await groupF;


const groupF = async () =>{
    const token = sessionStorage.getItem('token');
    console.log(token)
    if (!token || token==null) {
        history('/page/login');
    }else {
      var lists = token.split("*,y+*");
      setIdEnvoyeur(parseInt(lists[1]));
      if(lists.length === 2 && lists[0].toString() !== CryptoJS.SHA256(parseInt(lists[1])).toString()){
        history('/page/login');
      }
    }
}

function formatDateTime(dateArray) {
    const [year, month, day, hour, minute, second, millisecond] = dateArray;
    const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date(year, month - 1, day, hour, minute, second, millisecond));
    return formattedDate.toUpperCase();
}

const CallAPI = () => {
    setLoading(true);
    console.log(idEnvoyeur)

    fetch(`${apiUrl}/api/proprietaires/discussions/last/${idEnvoyeur}`, 
    {
        method: 'POST',
        headers: {
                "access-control-allow-origin": "*",
                "Content-type": "application/json; charset=UTF-8"
            },
        credentials: 'include',
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
            "access-control-allow-origin": "*",
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            idEnvoyeur: idEnvoyeur,
            idReceveur:idReceveur
        }),
        credentials: 'include',
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
    if(idEnvoyeur !==null && idReceveur!==null){
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
        "access-control-allow-origin" : "*",
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        message:hafatra,
        idEnvoyeur: idEnvoyeur,
        idReceveur: idReceveur,
        status: 1
      }),
      credentials: 'include',
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
        <Auth_token/>
        <Message_unread nombre_membre ={12} />
        <article className="chat">
            <div className="recent">
                <div className="titre">
                    <h2>Recent</h2>
                </div>
                <div className="AllMessage">
                    {
                            lastMessagerie.map((messagerie, index) =>  {
                                if (parseInt(messagerie.envoyeur.id) !== idEnvoyeur) {
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
                            } })
                    }
                </div>
            </div>
            <div className="detailsMessage">
                <div className="headerMessage">
                    <div className="infoProfile">
                        <div className="profile">
                            <img src="../../src/assets/img/valiha.jpg" alt=""/>
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
                            if (parseInt(discussions.envoyeur.id) === parseInt(sessionStorage.getItem("token").split("*,y+*")[1])) {
                                return (
                                    <div className="sender" key={index}>
                                        <div className="pdp">
                                            <img src="../../src/assets/img/valiha.jpg" alt="pdp" />
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
                                            <img src="../../src/assets/img/Fytahina.jpg" alt="pdp"/>
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

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Message_unread from '../../composant/composant_message/Message_unread';
// import Auth_token from '../../Auth_token';
// import Message_apercu from '../../composant/composant_message/Message_apercu';
// import apiUrl from '../../apiUrl';
// import CryptoJS from 'crypto-js';

// const Message = () => {
//   const [lastMessagerie, setLastMessagerie] = useState([]);
//   const [discussions, setDiscussions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [elementActif, setElementActif] = useState(0);
//   const [nomReceiver, setNomReceiver] = useState(null);
//   const [idReceveur, setIdReceveur] = useState(null);
//   const [idEnvoyeur, setIdEnvoyeur] = useState(null);
//   const [hafatra, setHafatra] = useState('');
//   const history = useNavigate();
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = sessionStorage.getItem('token');
//         if (!token || token === null) {
//           throw new Error('User not authenticated');
//         }
//         const lists = token.split("*,y+*");
//         const isValidToken = lists.length === 2 && lists[0].toString() === CryptoJS.SHA256(parseInt(lists[1])).toString();
//         if (!isValidToken) {
//           throw new Error('Invalid token');
//         }
//         setIdEnvoyeur(parseInt(lists[1]));
//       } catch (error) {
//         console.error('Authentication Error:', error.message);
//         history('/page/login');
//       }
//     };
//     fetchUserData();
//   }, [history]);

//   const formatDateTime = (dateArray) => {
//     const [year, month, day, hour, minute, second, millisecond] = dateArray;
//     const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
//     const formattedDate = new Intl.DateTimeFormat('en-US', options).format(
//       new Date(year, month - 1, day, hour, minute, second, millisecond)
//     );
//     return formattedDate.toUpperCase();
//   };

//   const callAPI = () => {
//     setLoading(true);

//     fetch(`${apiUrl}/api/proprietaires/discussions/last/${idEnvoyeur}`, {
//       method: 'POST',
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//       },
//       credentials: 'include',
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`Failed to fetch messages. Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         setLastMessagerie(data.data);
//       })
//       .catch(error => {
//         console.error('API Error:', error.message);
//         setError('Failed to fetch data');
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   const getDiscussions = () => {
//     fetch(`${apiUrl}/api/proprietaires/discussions`, {
//       method: 'POST',
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//       },
//       body: JSON.stringify({
//         idEnvoyeur: idEnvoyeur,
//         idReceveur: idReceveur,
//       }),
//       credentials: 'include',
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`Failed to fetch discussions. Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         setDiscussions(data.data);
//       })
//       .catch(error => {
//         console.error('API Error:', error.message);
//         setError('Failed to fetch data');
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     callAPI();
//     getDiscussions();
//   }, [idEnvoyeur]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//     const sendHafatra = () => {
//     if (hafatra !== null) {
//       fetch(`${apiUrl}/api/proprietaires/messagerie`, {
//         method: 'POST',
//         headers: {
//           'Content-type': 'application/json; charset=UTF-8',
//         },
//         body: JSON.stringify({
//           message: hafatra,
//           idEnvoyeur: idEnvoyeur,
//           idReceveur: idReceveur,
//           status: 1,
//         }),
//         credentials: 'include',
//       })
//         .then(response => {
//           if (!response.ok) {
//             throw new Error(`Failed to send message. Status: ${response.status}`);
//           }
//           return response.json();
//         })
//         .then(data => {
//           console.log('Send message successful:', data);
//         })
//         .catch(error => {
//           console.error('Message error:', error.message);
//         });
//       setHafatra('');
//     }
//   };

//   return (
//     <section className="messenger">
//       <Auth_token />
//       <Message_unread nombre_membre={12} />
//       <article className="chat">
//         <div className="recent">
//                 <div className="titre">
//                     <h2>Recent</h2>
//                 </div>
//                 <div className="AllMessage">
//                     {
//                     lastMessagerie.map((messagerie, index) =>  {
//                         if (parseInt(messagerie.envoyeur.id) !== idEnvoyeur) {
//                             return (<Message_apercu
//                                 key={index}
//                                 className={`messageOne ${index === elementActif ? 'active' : ''}`}
//                                 nom={messagerie.envoyeur.nom}
//                                 lastMessage={messagerie.messagerie.message}
//                                 datemessage={messagerie.messagerie.dateHeureEnvoie}
//                                 onSubmit={(e) => {
//                                     e.preventDefault();
//                                     console.log("Clicked:", messagerie.envoyeur.id);
//                                     setNomReceiver(messagerie.envoyeur.nom);
//                                     setIdReceveur(messagerie.envoyeur.id);
//                                     setElementActif(index);
//                                 }}    
//                                 type="submit"                            
//                             />)
//                     } })
//                 }
//             </div>
//         </div>
//         <div className="detailsMessage">
//             <div className="headerMessage">
//                 <div className="infoProfile">
//                     <div className="profile">
//                         <img src="../../src/assets/img/valiha.jpg" alt=""/>
//                     </div>
//                     <div className="texte">
//                         <h1>{nomReceiver}</h1>
//                         <p className="statu">Actif <span><img src="" alt=""/></span></p>
//                     </div>
//                 </div>
//             </div>

//             <div className="allCommChat">
//                 { 
//                     discussions.slice().reverse().map((discussions, index) => {
//                         if (parseInt(discussions.envoyeur.id) === parseInt(sessionStorage.getItem("token").split("*,y+*")[1])) {
//                             return (
//                                 <div className="sender" key={index}>
//                                     <div className="pdp">
//                                         <img src="../../src/assets/img/valiha.jpg" alt="pdp" />
//                                     </div>
//                                     <div className="soratra">
//                                         <p>{discussions.messagerie.message}</p>
//                                         <h4>{formatDateTime(discussions.messagerie.dateHeureEnvoie)}</h4>
//                                     </div>
//                                 </div>
//                             );
//                         } else {
//                             return (
//                                 <div className="recever" key={index}>
//                                     <div className="pdp">
//                                         <img src="../../src/assets/img/Fytahina.jpg" alt="pdp"/>
//                                     </div>
//                                     <div className="soratra">
//                                         <p>{discussions.messagerie.message}</p>
//                                         <h4>{formatDateTime(discussions.messagerie.dateHeureEnvoie)}</h4>
//                                     </div>
//                                 </div>
//                             );
//                         }
//                     })
//                 }

//             </div>

//             <div className="textField">
//                 <form onSubmit={(e) => { e.preventDefault(); sendHafatra(); getDiscussions(); }}>
//                     <input value={hafatra} type="text" name="message" onChange={(e) => setHafatra(e.target.value)} id="" placeholder="Your Message...."/>
//                     <button type='submit'>
//                         <svg id="senderIcon" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.14 19.14">
//                             <defs>
//                             </defs>
//                             <g id="ELEMENTS">
//                                 <g>
//                                 <path className="cls-1" d="m17.34.18c-.51-.19-1.08-.24-1.67-.08L2.05,3.74c-2.46.66-2.79,4.02-.5,5.14l4.91,2.16L17.34.18Z"/>
//                                 <path className="cls-1" d="m15.4,17.1l3.65-13.62c.16-.59.11-1.16-.08-1.67l-10.88,10.88,2.16,4.91c1.12,2.29,4.48,1.97,5.14-.5Z"/>
//                                 </g>
//                             </g>
//                         </svg>
//                     </button>
//                 </form>
//             </div>
//         </div>
//     </article>
//     </section>
//   );
// };

// export default Message;
