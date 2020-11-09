import { graphql, useStaticQuery } from "gatsby"
import React, { Suspense, useEffect, useRef } from "react"
import { Canvas } from "react-three-fiber"
import styled from "styled-components"

import Blob from "./blob"
import HandAnimatedModel from "./handAnimated"
import SceneLoader from "../sceneLoader"
import { Provider, ReactReduxContext } from "react-redux"

// Useful for exploring scene in development mode
// import CameraControls from "./cameraControls"

const SceneLights = () => (
  <group>
    <ambientLight intensity={0.2} color="#fff" />
    <directionalLight intensity={1} position={[0, -20, 10]} color="#f00" />
    <pointLight intensity={0.35} position={[-20, 10, 5]} color="#f0a" />
    <pointLight intensity={0.1} position={[20, 10, 5]} color="#fff" />
  </group>
)

const FingerBlobs = () => (
  <group>
    {/* Thumb */}
    <Blob wireframe segments={20} position={[-18, -10, -30]} sizeFactor={1} />
    {/* Index */}
    <Blob wireframe segments={20} position={[-9, -4, -40]} sizeFactor={1} />
    {/* Middle */}
    <Blob wireframe segments={20} position={[0, -2.5, -36]} sizeFactor={1} />
    {/* Ring */}
    <Blob wireframe segments={20} position={[7, -4, -35]} sizeFactor={1} />
    {/* Pinkie */}
    <Blob wireframe segments={20} position={[12.5, -7, -33]} sizeFactor={1} />
    {/* Palm */}
    <Blob wireframe segments={40} position={[0, -15, -25]} sizeFactor={6} />
  </group>
)

const CanvasContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: -1;
  top: 0;
`

function HandCanvas() {
  // const mouse = useRef({ x: 0, y: 0 })
  const { handAnimated, textureImage } = useStaticQuery(graphql`
    query {
      handAnimated: file(relativePath: { eq: "hand-animated.glb" }) {
        publicURL
      }
      textureImage: file(relativePath: { eq: "slime-marble-texture.jpg" }) {
        publicURL
      }
    }
  `)

  // Hack for Gatsby static site generator since window is not available at compilation time
  // See: https://www.gatsbyjs.com/docs/debugging-html-builds/
  const pixelRatio = useRef(1)
  useEffect(() => void (pixelRatio.current = window.devicePixelRatio), [])

  return (
    <CanvasContainer>
      <ReactReduxContext.Consumer>
        {({ store }) => (
          <Canvas
            pixelRatio={pixelRatio.current}
            camera={{ position: [0, 10, 15], rotation: [0, 0, 0] }}
          >
            <Provider store={store}>
              <SceneLights />
              <Suspense fallback={null}>
                <group position={[0, 7, 14]}>
                  <HandAnimatedModel
                    gltfURL={handAnimated.publicURL}
                    textureURL={textureImage.publicURL}
                    position={[0, -80, 0]}
                    rotation={[0, 0, 0]}
                    scale={[40, 40, 40]}
                  />
                  <FingerBlobs />
                </group>
              </Suspense>
              {/* <CameraControls /> */}
            </Provider>
          </Canvas>
        )}
      </ReactReduxContext.Consumer>
      <SceneLoader />
    </CanvasContainer>
  )
}

export default HandCanvas
