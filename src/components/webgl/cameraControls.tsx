import React, { useRef } from "react"
import { extend, ReactThreeFiber, useFrame, useThree } from "react-three-fiber"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<
        OrbitControls,
        typeof OrbitControls
      >
    }
  }
}

extend({ OrbitControls })

const CameraControls = () => {
  // Get a reference to the scene's camera and the canvas' html element
  const {
    camera,
    gl: { domElement },
  } = useThree()

  const controls = useRef<OrbitControls>()
  useFrame(state => void controls.current?.update())

  return <orbitControls ref={controls} args={[camera, domElement]} />
}

export default CameraControls
