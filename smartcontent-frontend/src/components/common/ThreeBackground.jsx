import { Canvas } from '@react-three/fiber';
import { Float, Sphere, Box, Torus } from '@react-three/drei';
import { useTheme } from '../../hooks/useTheme';

const FloatingShape = ({ position, shape = 'sphere', color }) => {
  const shapes = {
    sphere: <Sphere args={[1, 32, 32]}><meshStandardMaterial color={color} wireframe /></Sphere>,
    box: <Box args={[1.5, 1.5, 1.5]}><meshStandardMaterial color={color} wireframe /></Box>,
    torus: <Torus args={[1, 0.4, 16, 32]}><meshStandardMaterial color={color} wireframe /></Torus>,
  };

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
      position={position}
    >
      {shapes[shape]}
    </Float>
  );
};

const ThreeBackground = () => {
  const { isDark } = useTheme();
  const shapeColor = isDark ? '#3B82F6' : '#2563EB';

  return (
    <div className="fixed inset-0 -z-10 opacity-30">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <FloatingShape position={[-4, 2, 0]} shape="sphere" color={shapeColor} />
        <FloatingShape position={[4, -2, -2]} shape="box" color={shapeColor} />
        <FloatingShape position={[0, 3, -3]} shape="torus" color={shapeColor} />
        <FloatingShape position={[-3, -3, 1]} shape="sphere" color={shapeColor} />
        <FloatingShape position={[3, 1, 2]} shape="box" color={shapeColor} />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
