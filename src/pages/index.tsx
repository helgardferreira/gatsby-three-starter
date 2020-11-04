import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import styled from "styled-components"
import HandCanvas from "../components/webgl/handCanvas"

const HeaderHeading = styled.h1`
  position: absolute;
  top: 40vh;
  left: 100px;
  transform: translateY(-50%);
`

const StyledLink = styled(Link)`
  position: relative;
  top: 20vh;
  left: 100px;
`

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <HeaderHeading>HELLO</HeaderHeading>
      <StyledLink to="/page-2/">Go to page 2</StyledLink> <br />
      <StyledLink to="/using-typescript/">
        Go to &quot;Using TypeScript&quot;
      </StyledLink>
      <HandCanvas />
    </Layout>
  )
}

export default IndexPage
