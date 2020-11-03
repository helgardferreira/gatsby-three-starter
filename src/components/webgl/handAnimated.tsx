import React, {
  useRef,
  useState,
  useEffect,
  FunctionComponent,
  useLayoutEffect,
  useContext,
} from "react"
import { useFrame } from "react-three-fiber"

import { GLTF } from "three/examples/jsm/loaders/GLTFLoader"
import {
  AnimationAction,
  AnimationMixer,
  Bone,
  Group,
  IUniform,
  LoopOnce,
  MeshStandardMaterial,
  ShaderMaterial,
  SkinnedMesh,
} from "three"
import useGLTF from "../../lib/hooks/useGLTF"
import useTexture from "../../lib/hooks/useTexture"

// Leveraging WebPack's raw loader
import fluidMarbleFragment from "raw-loader!./shaders/fluidMarbleFragment.glsl"
import fluidMarbleVertex from "raw-loader!./shaders/fluidMarbleVertex.glsl"
import { MotionContext } from "../../lib/MotionContext"

type GLTFResult = GLTF & {
  nodes: {
    hand_anatomy_man: SkinnedMesh
    root: Bone
    ["MCH-hand_ikparentL"]: Bone
    ["MCH-upper_arm_ik_targetparentL"]: Bone
  }
  materials: {
    White: MeshStandardMaterial
  }
}

type ActionName = "rigAction"
type GLTFActions = Record<ActionName, AnimationAction>

interface IHandProps {
  gltfURL: string
  textureURL: string
}

interface IFragmentUniforms {
  [uniform: string]: IUniform
}

const HandAnimatedModel: FunctionComponent<
  IHandProps & JSX.IntrinsicElements["group"]
> = ({ gltfURL, textureURL, ...props }) => {
  useLayoutEffect(() => void useGLTF.preload(gltfURL), [gltfURL])

  const group = useRef<Group>()
  const {
    nodes,
    // materials,
    animations,
  } = useGLTF<GLTFResult>(gltfURL)

  const texture = useTexture(textureURL)

  const uniforms = useRef<IFragmentUniforms>({
    // resolution: { value: new Vector3() },
    time: { value: 0 },
    marble: { value: texture },
  })

  const actions = useRef<GLTFActions>()
  const [mixer] = useState(() => new AnimationMixer(nodes.hand_anatomy_man))

  const shaderMaterial = new ShaderMaterial({
    uniforms: uniforms.current,
    vertexShader: fluidMarbleVertex,
    fragmentShader: fluidMarbleFragment,
    skinning: true,
  })

  const motion = useContext(MotionContext)

  useFrame(({ clock }, delta) => {
    mixer.update(delta)
    uniforms.current.time.value = clock.getElapsedTime()

    if (motion.get() === 0 && actions.current) actions.current.rigAction.play()
  })

  useEffect(() => {
    actions.current = {
      rigAction: mixer.clipAction(animations[0], group.current),
    }
    actions.current.rigAction.timeScale = 15
    // actions.current.rigAction.loop = LoopPingPong
    actions.current.rigAction.loop = LoopOnce
    actions.current.rigAction.clampWhenFinished = true

    return () => animations.forEach(clip => mixer.uncacheClip(clip))
  }, [])

  return (
    <group ref={group} {...props}>
      <group position={[0, 0, 0]} scale={[1, 1, 1]}>
        <group position={[0, 0, 0]} scale={[1, 1, 1]}>
          <primitive object={nodes.root} />
          <primitive object={nodes["MCH-hand_ikparentL"]} />
          <primitive object={nodes["MCH-upper_arm_ik_targetparentL"]} />

          <skinnedMesh
            material={shaderMaterial}
            geometry={nodes.hand_anatomy_man.geometry}
            skeleton={nodes.hand_anatomy_man.skeleton}
          />
        </group>
      </group>
    </group>
  )
}

export default HandAnimatedModel