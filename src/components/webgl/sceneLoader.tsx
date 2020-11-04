import React, { FunctionComponent, useContext, useRef } from "react"
import { motion, useSpring, useTransform } from "framer-motion"
import styled from "styled-components"
import { useFrame } from "react-three-fiber"
import { Html, useProgress } from "@react-three/drei"

import { LoadingContext } from "../../lib/LoadingContext"

const LoadingContainer = styled(Html)`
  width: 100vw;
  height: 100vh;
`

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

  const timerToken = useRef(0)

  const letters = Array.from("LOADING...")

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
    <LoadingContainer center>
      <LoadingScreen
        style={{
          opacity,
        }}
      />
      <LoadingBar>
        <motion.h2
          style={{
            fontSize: "50px",
            height: "50px",
            fontWeight: "bold",
            position: "absolute",
            left: "50%",
            transform: "translate(-50%, -120%)",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            opacity,
          }}
        >
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              style={{
                width: "auto",
                height: "50px",
                position: "relative",
              }}
              animate={{ y: [-20, 0, 0, -20] }}
              transition={{
                repeat: Infinity,
                delay: index * 0.06,
                duration: 1.6,
                times: [0, 0.2, 0.8, 1],
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h2>
        <motion.div
          style={{
            width,
            height: 10,
            background: "#fff",
          }}
        ></motion.div>
      </LoadingBar>
    </LoadingContainer>
  )
}

export default SceneLoader
