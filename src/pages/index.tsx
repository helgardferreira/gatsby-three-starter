import React, { Suspense, useEffect, useRef } from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import { Canvas } from "react-three-fiber"
// import HandModel from "../components/gltf/Hand"
import { Color, Vector3 } from "three"
import { graphql, useStaticQuery } from "gatsby"

import HandAnimatedModel from "../components/webgl/handAnimated"
import Blob from "../components/webgl/blob"
import CameraControls from "../components/webgl/cameraControls"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      {/* <h1
        style={{
          position: "absolute",
          top: "25vh",
          left: 100,
          transform: "translateY(-50%)",
        }}
      >
        HELLO
      </h1> */}
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
      textureImage: file(relativePath: { eq: "neon-marble-texture.jpg" }) {
        publicURL
      }
    }
  `)

  // Hack for Gatsby static site generator since window is not available at compilation time
  // See: https://www.gatsbyjs.com/docs/debugging-html-builds/
  const pixelRatio = useRef(1)
  useEffect(() => void (pixelRatio.current = window.devicePixelRatio), [])

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
      <hemisphereLight
        color={new Color("#00CC99")}
        groundColor={new Color("#0066CC")}
        intensity={0.69}
        position={[0, 50, 0]}
      />
      <directionalLight position={[-8, 12, 8]} castShadow />
      <Suspense fallback={null}>
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
            isInvalid={false}
            isModified={false}
            segments={30}
            position={[-18, -10, -30]}
          />
          {/* Index */}
          <Blob
            wireframe
            isInvalid={false}
            isModified={false}
            segments={30}
            position={[-9, -4, -40]}
          />
          {/* Middle */}
          <Blob
            wireframe
            isInvalid={false}
            isModified={false}
            segments={30}
            position={[0, -2.5, -36]}
          />
          {/* Ring */}
          <Blob
            wireframe
            isInvalid={false}
            isModified={false}
            segments={30}
            position={[7, -4, -35]}
          />
          {/* Pinkie */}
          <Blob
            wireframe
            isInvalid={false}
            isModified={false}
            segments={30}
            position={[12.5, -7, -33]}
          />
          <Blob
            wireframe
            isInvalid={false}
            isModified={false}
            segments={40}
            position={[0, -15, -25]}
            scale={[6, 6, 6]}
          />
        </group>
      </Suspense>
      {/* <CameraControls /> */}
    </Canvas>
  )
}

export default IndexPage
