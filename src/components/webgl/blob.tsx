import React, { useRef, FunctionComponent, useEffect, useContext } from "react"
import { useFrame } from "react-three-fiber"
import {
  Mesh,
  UniformsUtils,
  ShaderLib,
  Color,
  ShaderMaterial,
  SphereGeometry,
} from "three"
import { useSpring, useTransform } from "framer-motion"

import blobVertex from "raw-loader!./shaders/blobVertex.glsl"
import { MotionContext } from "../../lib/MotionContext"
import { LoadingContext } from "../../lib/LoadingContext"

interface IBlobProps {
  isInvalid?: boolean
  isModified?: boolean
  segments?: number
  wireframe?: boolean
  sizeFactor?: number
}

const Blob: FunctionComponent<IBlobProps & JSX.IntrinsicElements["mesh"]> = ({
  isInvalid = false,
  isModified = false,
  segments = 50,
  wireframe = false,
  sizeFactor: size = 1,
  ...props
}) => {
  const timeOffset = useRef(Math.random() * 1000)
  const rotationOffset = useRef({
    x: Math.random() / 100,
    y: Math.random() / 100,
    z: Math.random() / 100,
  })
  const amp = useSpring(0, {
    stiffness: 42,
  })
  const color = useTransform(
    amp,
    [0, 0.3, 0.6],
    [`#ff00ff`, `#ff00ff`, `#ff0050`]
  )

  const motion = useContext(MotionContext)
  const blobMotion = useTransform(motion, val => val * size)

  blobMotion.onChange(() => {
    const newSize = blobMotion.get()
    if (mesh.current) mesh.current.scale.set(newSize, newSize, newSize)
  })

  useEffect(() => {
    if (isInvalid) amp.set(0.8)
    else if (isModified) amp.set(0.3)
    else amp.set(0.0)
  }, [isInvalid, isModified])

  const diffuseColor = useRef(new Color("#ff00ff"))
  const customUniforms = useRef(
    UniformsUtils.merge([
      ShaderLib.phong.uniforms,
      { diffuse: { value: diffuseColor.current } },
      { amp: { value: 0.0 } },
      { time: { value: 0.0 } },
    ])
  )

  const mesh = useRef<Mesh<SphereGeometry>>(null)
  const customMaterial = useRef<ShaderMaterial>(null)

  useFrame(({ clock }) => {
    if (mesh.current) {
      // mesh.current.rotation.x += 0.005
      mesh.current.rotation.x += rotationOffset.current.x
      mesh.current.rotation.y += rotationOffset.current.y
      mesh.current.rotation.z += rotationOffset.current.z
    }

    if (customMaterial.current) {
      customMaterial.current.uniforms.amp.value = amp.get()
      customMaterial.current.uniforms.diffuse.value = diffuseColor.current
      customMaterial.current.uniforms.time.value =
        clock.getElapsedTime() + timeOffset.current

      diffuseColor.current.set(color.get())
    }
  })
  const loading = useContext(LoadingContext)

  return (
    <mesh
      ref={mesh}
      scale={[blobMotion.get(), blobMotion.get(), blobMotion.get()]}
      onClick={() => {
        if (!loading.current) {
          amp.set(0.8)
          motion.set(0)
        }
      }}
      onPointerOver={() => {
        if (!loading.current) {
          amp.set(0.6)
          document.body.style.cursor = "pointer"
        }
      }}
      onPointerOut={() => {
        if (!loading.current) {
          amp.set(0.0)
          document.body.style.cursor = "auto"
        }
      }}
      {...props}
    >
      <sphereGeometry attach="geometry" args={[1, segments, segments]} />
      <shaderMaterial
        ref={customMaterial}
        attach="material"
        uniforms={customUniforms.current}
        vertexShader={blobVertex}
        fragmentShader={ShaderLib.phong.fragmentShader}
        wireframe={wireframe}
        lights
      />
    </mesh>
  )
}

export default Blob
