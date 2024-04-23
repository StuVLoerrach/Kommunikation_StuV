import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Dodecahedron,
  Icosahedron,
  OrbitControls,
  Polyhedron,
  Tetrahedron,
  TorusKnot,
} from "@react-three/drei";

function Solid({ shapeType, color, ...props }) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta));
  // Return the view, these are regular Threejs elements expressed in JSX

  const getShape = (type) => {
    switch (type) {
      case "Dodecahedron":
        return <Dodecahedron />;
      case "Icosahedron":
        return <Icosahedron />;
      case "Tetrahedron":
        return <Tetrahedron />;
      default:
        return null;
    }
  };

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={(event) => hover(false)}
    >
      {getShape(shapeType)}
      <meshStandardMaterial color={"hotpink"} />
    </mesh>
  );
}

const shapes = ["Dodecahedron", "Icosahedron", "Tetrahedron"];

const Avatar = ({ index }) => {
  return (
    <Canvas>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Solid
        shapeType={shapes[index]}
      />
      <OrbitControls />
    </Canvas>
  );
};

export default Avatar;
