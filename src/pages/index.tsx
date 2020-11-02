import React, { Suspense, useEffect, useRef } from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import { Canvas } from "react-three-fiber"
// import HandModel from "../components/gltf/Hand"
import { graphql, useStaticQuery } from "gatsby"

import HandAnimatedModel from "../components/webgl/handAnimated"
import Blob from "../components/webgl/blob"
import CameraControls from "../components/webgl/cameraControls"
import { useSpring } from "framer-motion"

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
      {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div> */}
      <HandCanvas />
      {/* <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/using-typescript/">Go to &quot;Using TypeScript&quot;</Link> */}
    </Layout>
  )
}

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
    restDelta: 0.1,
    stiffness: 77,
    // mass: 7,
    // damping: 7,
  })

  return (
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
        top: 0,
      }}
    >
      <ambientLight intensity={0.2} color="#fff" />
      <directionalLight intensity={1} position={[0, -20, 10]} color="#f00" />
      <pointLight intensity={0.35} position={[-20, 10, 5]} color="#f0a" />
      <pointLight intensity={0.1} position={[20, 10, 5]} color="#fff" />
      <Suspense fallback={null}>
        <group position={[0, 7, 14]}>
          <HandAnimatedModel
            gltfURL={handAnimated.publicURL}
            textureURL={textureImage.publicURL}
            position={[0, -80, 0]}
            rotation={[0, 0, 0]}
            scale={[40, 40, 40]}
            motion={motion}
          />
          {/* Thumb */}
          <Blob
            wireframe
            segments={20}
            position={[-18, -10, -30]}
            size={1}
            motion={motion}
          />
          {/* Index */}
          <Blob
            wireframe
            segments={20}
            position={[-9, -4, -40]}
            size={1}
            motion={motion}
          />
          {/* Middle */}
          <Blob
            wireframe
            segments={20}
            position={[0, -2.5, -36]}
            size={1}
            motion={motion}
          />
          {/* Ring */}
          <Blob
            wireframe
            segments={20}
            position={[7, -4, -35]}
            size={1}
            motion={motion}
          />
          {/* Pinkie */}
          <Blob
            wireframe
            segments={20}
            position={[12.5, -7, -33]}
            size={1}
            motion={motion}
          />
          <Blob
            wireframe
            segments={40}
            position={[0, -15, -25]}
            size={6}
            motion={motion}
          />
        </group>
      </Suspense>
      {/* <CameraControls /> */}
    </Canvas>
  )
}

export default IndexPage
