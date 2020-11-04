import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

import HandCanvas from "../components/webgl/handCanvas"

const HeaderHeading = styled.h1`
  position: absolute;
  top: max(50vh, 250px);
  left: 100px;
  transform: translateY(-100%);
`

const StyledLink = styled(Link)`
  position: relative;
  top: max(20vh, 100px);
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
