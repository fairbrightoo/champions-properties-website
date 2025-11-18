import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const House = (props) => {
    // 1. Load the local .glb file
    // Note the path starts with "/" which points to the public folder
    const { scene } = useGLTF('/models/house.glb');
    const ref = useRef();

    // 2. Rotate the house slowly
    useFrame((state, delta) => {
        ref.current.rotation.y += delta * 0.1; // Adjust 0.1 for speed
    });

    return (
        <primitive
            ref={ref}
            object={scene}
            {...props}
        />
    );
};

export default House;