import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Message_unread from '../../composant/composant_message/Message_unread';
const Message = () =>
{
 return (
    <section className="messenger">
        <Message_unread nombre_message ={12} />
        <article className="chat">
            <div className="recent">
                <div className="titre">
                    <h2>Recent</h2>
                </div>
                <div className="AllMessage">
                    <div className="messageOne active">
                        <a href="#">
                            <div className="profile">
                                <img src="../../src/assets/img/valiha.jpg" alt=""/>
                            </div>
                            <div className="texte">
                                <h1>Alice Randria</h1>
                                <p className="messageDernier">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi doloremque unde dolore aut. Officia distinctio quisquam ipsum obcaecati tempore pariatur dolor excepturi veritatis adipisci atque iure, animi odio exercitationem optio.</p>
                            </div>
                            <div className="hour">
                                <h4>8Hour ago</h4>
                            </div>
                        </a>
                    </div>
                    
                
                </div>
            </div>
            <div className="detailsMessage">
                <div className="headerMessage">
                    <div className="infoProfile">
                        <div className="profile">
                            <img src="../../src/assets/img/valiha.jpg" alt=""/>
                        </div>
                        <div className="texte">
                            <h1>Alice Randria</h1>
                            <p className="statu">Actif <span><img src="" alt=""/></span></p>
                        </div>
                    </div>
                </div>
                <div className="allCommChat">
                    <div className="sender">
                        <div className="pdp">
                            <img src="../../src/assets/img/valiha.jpg" alt="pdp"/>
                        </div>
                        <div className="soratra">
                            <p>Lorem ipsum doe!</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita necessitatibus doloribus nobis non totam atque autem dolor laborum praesentium animi eligendi hic natus cumque sit provident dolore, inventore, suscipit eaque!</p>
                            <h4>JAN 17, 7:38PM</h4>
                        </div>
                    </div>
                    <div className="recever">
                        <div className="pdp">
                            <img src="../../src/assets/img/Fytahina.jpg" alt="pdp"/>
                        </div>
                        <div className="soratra">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita necessitatibus doloribus nobis non totam atque autem dolor laborum praesentium animi eligendi hic natus cumque sit provident dolore, inventore, suscipit eaque!</p>
                            <h4>JAN 17, 7:38PM</h4>
                        </div>
                    </div>
                    <div className="sender">
                        <div className="pdp">
                            <img src="../../src/assets/img/valiha.jpg" alt="pdp"/>
                        </div>
                        <div className="soratra">
                            <p>Lorem ipsum dolor snatus cumque sit provident dolore, inventore, suscipit eaque!</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita necessitatibus doloribus nobis non totam atque autem dolor laborum praesentium animi eligendi hic natus cumque sit provident dolore, inventore, suscipit eaque!</p>
                            <h4>JAN 17, 7:38PM</h4>
                        </div>
                    </div>
                    <div className="recever">
                        <div className="pdp">
                            <img src="../../src/assets/img/Fytahina.jpg" alt="pdp"/>
                        </div>
                        <div className="soratra">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita necessitatibus doloribus nobis non totam atque autem dolor laborum praesentium animi eligendi hic natus cumque sit provident dolore, inventore, suscipit eaque!</p>
                            <h4>JAN 17, 7:38PM</h4>
                        </div>
                    </div>
                </div>
                <div className="textField">
                    <form action="" method="post">
                        <input type="text" name="message" id="" placeholder="Your Message...."/>
                        <button>
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
