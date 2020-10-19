import React, { FunctionComponent, useLayoutEffect, useRef } from "react"

import { useFrame } from "react-three-fiber"
import { SkinnedMesh, Bone, MeshStandardMaterial, Group } from "three"
import useGLTF from "../../lib/hooks/useGLTF"
// import { Euler } from "three"

type GLTFInfo = {
  nodes: {
    hand_anatomy_man: SkinnedMesh
    root: Bone
    ["MCH-hand_ikparentL"]: Bone
    ["MCH-upper_arm_ik_targetparentL"]: Bone
  }
  materials: {
    Material: MeshStandardMaterial
  }
}

interface IProps {
  gltfURL: string
}

const HandModel: FunctionComponent<IProps & JSX.IntrinsicElements["group"]> = ({
  gltfURL,
  ...props
}) => {
  useLayoutEffect(() => void useGLTF.preload(gltfURL), [gltfURL])

  const group = useRef<Group>()
  const { nodes, materials } = useGLTF<GLTFInfo>(gltfURL)
  // const eulerRot = useRef<Euler>(new Euler(0, 0, 0))

  useFrame(() =>
    // { clock }
    {
      group.current.rotateY(0.005)
      // group.current.setRotationFromEuler(eulerRot.current)
      // eulerRot.current.y =
      //   ((Math.sin(clock.getElapsedTime()) + 1) / 2) * 2 * Math.PI
    }
  )

  return (
    <group ref={group} {...props}>
      <group rotation={[0, 0.98, 0]} scale={[1.76, 1.76, 1.76]}>
        <group
          position={[0, 2.59, 0]}
          rotation={[0, 1.18, -Math.PI]}
          scale={[0.57, 0.57, 0.57]}
        >
          <primitive object={nodes.root} />
          <primitive object={nodes["MCH-hand_ikparentL"]} />
          <primitive object={nodes["MCH-upper_arm_ik_targetparentL"]} />
          <skinnedMesh
            material={materials.Material}
            geometry={nodes.hand_anatomy_man.geometry}
            skeleton={nodes.hand_anatomy_man.skeleton}
          />
        </group>
      </group>
    </group>
  )
}

export default HandModel
