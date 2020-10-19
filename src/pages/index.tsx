import React, { Suspense, useEffect, useRef } from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import { Canvas } from "react-three-fiber"
// import HandModel from "../components/gltf/Hand"
import { Color } from "three"
import { graphql, useStaticQuery } from "gatsby"
import HandAnimationModel from "../components/gltf/HandAnimated"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <h1
        style={{
          position: "absolute",
          top: "50vh",
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
  /* const data = useStaticQuery(graphql`
    query {
      hand: file(relativePath: { eq: "hand.glb" }) {
        publicURL
      }
    }
  `) */
  const data = useStaticQuery(graphql`
    query {
      hand: file(relativePath: { eq: "hand_animated.glb" }) {
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
      camera={{ position: [0, 5, 15] }}
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
        color={new Color("blue")}
        groundColor={new Color("red")}
        intensity={0.69}
        position={[0, 50, 0]}
      />
      <directionalLight position={[-8, 12, 8]} castShadow />
      <Suspense fallback={null}>
        {/* <HandModel
          gltfURL={data.hand.publicURL}
          position={[0, -35, 0]}
          scale={[10, 10, 10]}
        /> */}
        <HandAnimationModel
          gltfURL={data.hand.publicURL}
          position={[0, -70, 0]}
          rotation={[0, 0, 0]}
          scale={[40, 40, 40]}
        />
      </Suspense>
    </Canvas>
  )
}

export default IndexPage
