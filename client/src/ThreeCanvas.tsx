import { Canvas, useFrame } from "@react-three/fiber";

const ThreeCanvas = () => {
  return (
    <Canvas>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={"orange"} />
      </mesh>
    </Canvas>
  );
};

export default ThreeCanvas;
