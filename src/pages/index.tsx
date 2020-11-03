import React, { Suspense, useEffect, useRef } from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { Canvas } from "react-three-fiber"
import { useSpring } from "framer-motion"
import { Loader } from "@react-three/drei"

import Layout from "../components/layout"
import SEO from "../components/seo"

import HandAnimatedModel from "../components/webgl/handAnimated"
import Blob from "../components/webgl/blob"
// import CameraControls from "../components/webgl/cameraControls"

import { MotionContext } from "../lib/MotionContext"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <h1
        style={{
          position: "absolute",
          top: "25vh",
          left: 100,
          transform: "translateY(-50%)",
        }}
      >
        HELLO
      </h1>
      <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/using-typescript/">Go to &quot;Using TypeScript&quot;</Link>
      <HandCanvas />
    </Layout>
  )
}

/* function MyLoader() {
  const { active, progress, errors, item, loaded, total } = useProgress()
  return <Html center>{progress} % loaded</Html>
} */

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

  const motion = useSpring(1, {
    restDelta: 0.1, // 0.01
    stiffness: 77, // 100
    // mass: 1,
    // damping: 10,
  })

  return (
    <>
      <Canvas
        // onMouseMove={e => (mouse.current = getMousePos(e))}
        // shadowMap
        pixelRatio={pixelRatio.current}
        camera={{ position: [0, 10, 15], rotation: [0, 0, 0] }}
        style={{
          padding: 0,
          margin: 0,
          width: "100%",
          height: "100vh",
          position: "absolute",
          zIndex: -1,
          top: 0,
        }}
      >
        <ambientLight intensity={0.2} color="#fff" />
        <directionalLight intensity={1} position={[0, -20, 10]} color="#f00" />
        <pointLight intensity={0.35} position={[-20, 10, 5]} color="#f0a" />
        <pointLight intensity={0.1} position={[20, 10, 5]} color="#fff" />
        {/* <Suspense fallback={<MyLoader />}> */}
        <Suspense fallback={null}>
          <MotionContext.Provider value={motion}>
            <group position={[0, 7, 14]}>
              <HandAnimatedModel
                gltfURL={handAnimated.publicURL}
                textureURL={textureImage.publicURL}
                position={[0, -80, 0]}
                rotation={[0, 0, 0]}
                scale={[40, 40, 40]}
              />
              {/* Thumb */}
              <Blob
                wireframe
                segments={20}
                position={[-18, -10, -30]}
                sizeFactor={1}
              />
              {/* Index */}
              <Blob
                wireframe
                segments={20}
                position={[-9, -4, -40]}
                sizeFactor={1}
              />
              {/* Middle */}
              <Blob
                wireframe
                segments={20}
                position={[0, -2.5, -36]}
                sizeFactor={1}
              />
              {/* Ring */}
              <Blob
                wireframe
                segments={20}
                position={[7, -4, -35]}
                sizeFactor={1}
              />
              {/* Pinkie */}
              <Blob
                wireframe
                segments={20}
                position={[12.5, -7, -33]}
                sizeFactor={1}
              />
              <Blob
                wireframe
                segments={40}
                position={[0, -15, -25]}
                sizeFactor={6}
              />
            </group>
          </MotionContext.Provider>
        </Suspense>
        {/* <CameraControls /> */}
      </Canvas>
      <Loader barStyles containerStyles dataStyles innerStyles />
    </>
  )
}

export default IndexPage
