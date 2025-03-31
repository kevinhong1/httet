import React, { useRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { convertMaterialsToBasic } from "../../utils/convertToBasic";
import * as THREE from "three";
import videos from "../../utils/videoTextures";


export default function Model(props) {
  const { nodes, materials } = useGLTF("/models/Light Room/Light_First.glb");
  const newMaterials = convertMaterialsToBasic(materials);

  const macScreenRef = useRef();
  const computerScreenRef = useRef();

  const computerScreenMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: "#f6f6f6",
      map: videos.designWork.texture,
    });
  }, []);

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={macScreenRef}
        geometry={nodes.Mac_Screen.geometry}
        material={computerScreenMaterial}
        position={[-0.861, 0.815 - 0.02, 0.684]}
        rotation={[0, 0.523, 0]}
      />
      <mesh
        ref={computerScreenRef}
        geometry={nodes.Computer_Screen.geometry}
        material={computerScreenMaterial}
        position={[-0.302, 0.955 - 0.02, 0.647]}
        rotation={[0, -0.053, 0]}
      />
      <mesh
        geometry={nodes.Light_First_Baked.geometry}
        material={newMaterials.REAL_first_Baked}
        position={[-0.231, -0.14 - 0.02, 0.652]}
        rotation={[Math.PI, 0, Math.PI]}
      />
    </group>
  );
}
useGLTF.preload("/models/Light Room/Light_First.glb");
