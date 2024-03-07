// import React, { useState } from 'react';

import Nav_accueil from "../../composant/composant_navigation/Nav_accueil";
import { Environment, KeyboardControls, OrbitControls, PointerLockControls, Sky, Stats } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { } from 'react'
import { Physics } from '@react-three/rapier'
import RoomMap from './RoomMap'

// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
const Accueil = () =>
{
 return (
   
    <div className="accueil">
            <section className="image3D">
                <div className="imgSecour">
                    <KeyboardControls map={[
                        { name: "forward", keys: ["ArrowUp", "KeyW"] },
                        { name: "back", keys: ["ArrowDown", "KeyS"] },
                        { name: "left", keys: ["ArrowLeft", "KeyA"] },
                        { name: "right", keys: ["ArrowRight", "KeyD"] },
                        ]}>
                        <Canvas  camera={{ position: [110, 30, 30], fov: 50 }} style={{backgroundColor:"#0e0e0e"}} >
                            {/* <PointerLockControls /> */}
                            <OrbitControls />
                            {/* <axesHelper /> */}
                            <Environment preset='sunset' />
                            {/* <Stats /> */}
                            {/* <Sky /> */}
                            <Physics>
                            <RoomMap />
                            </Physics>
                        </Canvas>
                    </KeyboardControls>
                    {/* <img src="/img/photo_Accueil.png" alt=""/> */}
                </div>
            </section>
            <section className="Contenu">
                <article className="titre">
                    <h1><span> FORGE </span>
                        YOUR 
                        EMPIRE</h1>
                </article>
                <Nav_accueil></Nav_accueil>
            </section>
        </div>
        
       
    );
};
export default Accueil;