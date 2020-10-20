import React, { useRef, FunctionComponent, useEffect } from "react"
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

interface IBlobProps {
  isInvalid?: boolean
  isModified?: boolean
  segments?: number
  wireframe?: boolean
}

const Blob: FunctionComponent<IBlobProps & JSX.IntrinsicElements["mesh"]> = ({
  isInvalid = false,
  isModified = false,
  segments = 50,
  wireframe = false,
  ...props
}) => {
  const timeOffset = useRef(Math.random() * 1000)
  const rotationOffset = useRef({
    x: Math.random() / 100,
    y: Math.random() / 100,
    z: Math.random() / 100,
  })
  const amp = useSpring(0, {
    stiffness: 30,
  })
  const color = useTransform(
    amp,
    [0, 0.2, 0.8],
    [`#0066CC`, `#0066CC`, `#00CC99`]
  )

  useEffect(() => {
    if (isInvalid) amp.set(0.8)
    else if (isModified) amp.set(0.2)
    else amp.set(0.0)
  }, [isInvalid, isModified])

  const diffuseColor = useRef(new Color("#0066CC"))
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
      customMaterial.current.uniforms.time.value =
        clock.getElapsedTime() + timeOffset.current
      customMaterial.current.uniforms.amp.value = amp.get()
      diffuseColor.current.set(color.get())
      customMaterial.current.uniforms.diffuse.value = diffuseColor.current
    }
  })

  return (
    <mesh
      ref={mesh}
      {...props}
      onPointerOver={() => {
        amp.set(0.8)
        document.body.style.cursor = "pointer"
      }}
      onPointerOut={() => {
        amp.set(0.0)
        document.body.style.cursor = "auto"
      }}
    >
      <sphereGeometry attach="geometry" args={[1, segments, segments]} />
      <shaderMaterial
        ref={customMaterial}
        attach="material"
        color={0x00ff00}
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
