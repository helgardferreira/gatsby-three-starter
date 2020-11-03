import { Html, useProgress } from "@react-three/drei"
import { motion, useSpring, useTransform } from "framer-motion"
import React, { FunctionComponent, useContext, useRef } from "react"
import { useFrame } from "react-three-fiber"
import styled from "styled-components"
import { LoadingContext } from "../../lib/LoadingContext"

const LoadingScreen = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #141414;
`

const LoadingBar = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  /* transform: translate(-200px, -50%); */
  transform: translate(-50%, -50%);
`

const SceneLoader: FunctionComponent = () => {
  const { active, progress } = useProgress()
  const loading = useContext(LoadingContext)

  const percent = useSpring(0)
  const width = useTransform(percent, val => val * 4)
  const opacity = useSpring(1)

  const timerToken = useRef<number>(0)

  if (loading.current) percent.set(progress)

  useFrame(() => {
    if (timerToken.current === 0 && !active) {
      timerToken.current = setTimeout(() => {
        // After Loading Animation Delay
        loading.current = false
        percent.set(0)
        opacity.set(0)
      }, 1000)
    }

    if (timerToken.current !== 0 && active) {
      clearTimeout(timerToken.current)
      timerToken.current = 0
    }
  })

  return (
    <Html
      center
      style={{
        width: `100vw`,
        height: `100vh`,
      }}
    >
      <LoadingScreen
        style={{
          opacity,
        }}
      />
      <LoadingBar>
        <motion.div
          style={{
            width,
            height: 10,
            background: "#fff",
          }}
        ></motion.div>
      </LoadingBar>
    </Html>
  )
}

export default SceneLoader
