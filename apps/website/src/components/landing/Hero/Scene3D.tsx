import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Scene3D = () => {
	const gltf = useLoader(GLTFLoader, "./character/scene.gltf");
	return (
		<Canvas>
			<OrbitControls enableZoom={false} />
			<ambientLight intensity={0.1} />
			<directionalLight color="red" position={[0, 0, 5]} />
			<mesh>
				<boxGeometry />
				<meshStandardMaterial />
			</mesh>
			<Suspense fallback={null}>
				<primitive object={gltf.scene} />
			</Suspense>
		</Canvas>
	);
};

export default Scene3D;
