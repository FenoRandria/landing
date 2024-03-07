import { useGLTF, Html, useAnimations, Float } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import React, { useEffect, useRef, useState } from 'react';
import './RoomMap.css'
import { useFrame } from 'react-three-fiber';
// import { Redirect } from 'react-router-dom';
const RoomMap = () => {
  const { scene , animations} = useGLTF("medieval_fantasy_book.glb");
  const sceneRef = useRef();
  const {actions} = useAnimations(animations, sceneRef)

  const buttonRef = useRef();

  console.log(animations)

  useEffect(() => {
    actions["The Life"].reset().play();
  }, [])

  return (
    <>
      <RigidBody type="fixed">
        <Float 
          speed={3} // Animation speed, defaults to 1
          rotationIntensity={1} // XYZ rotation intensity, defaults to 1
          floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
          floatingRange={[1, 10]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
        >

          <primitive object={scene} ref={sceneRef} />
        </Float>
      </RigidBody>

      <Html center position={[0, 0, 0]} transform onBeforeRender={() => {}}>
        <div
          ref={buttonRef}
          onClick={() => {
            alert("Bouton cliqué !");
            window.location.href = 'http://localhost:5173/';
          }}
          className="button"
        >
          Get Started
        </div>
      </Html>
    </>
  );
};

export default RoomMap;

