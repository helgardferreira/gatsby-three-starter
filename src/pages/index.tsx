import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import styled from "styled-components"
import HandCanvas from "../components/webgl/handCanvas"

// Useful for exploring scene in development mode
// import CameraControls from "../components/webgl/cameraControls"

const HeaderHeading = styled.h1`
  position: absolute;
  top: 25vh;
  left: 100;
  transform: translateY(-50%);
`

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <HeaderHeading>HELLO</HeaderHeading>
      <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/using-typescript/">Go to &quot;Using TypeScript&quot;</Link>
      <HandCanvas />
    </Layout>
  )
}

export default IndexPage
