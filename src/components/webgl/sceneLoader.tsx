import React, { FunctionComponent, useContext, useEffect, useRef } from "react"
import { motion, useAnimation, useSpring, useTransform } from "framer-motion"
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

  div {
    height: 10px;
    background: #fff;
  }
`

const LoadingText = styled(motion.h2)`
  font-size: 50px;
  height: 50px;
  font-weight: bold;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -120%);
  text-align: center;
  display: flex;
  justify-content: center;

  span {
    width: auto;
    height: 50px;
    position: relative;
  }
`

const SceneLoader: FunctionComponent = () => {
  const { active, progress } = useProgress()
  const loading = useContext(LoadingContext)

  const percent = useSpring(0)
  const width = useTransform(percent, val => val * 4)
  const opacity = useSpring(1)

  const timerToken = useRef(0)
  const loadingContainerRef = useRef<HTMLDivElement>(null)

  const controls = useAnimation()

  const letters = Array.from("LOADING...")

  if (loading.current) percent.set(progress)

  useEffect(() => {
    controls.start({
      y: [-20, 0, 0, -20],
    })
    return () => {
      controls.stop()
    }
  }, [])

  useFrame(() => {
    if (timerToken.current === 0 && !active) {
      timerToken.current = setTimeout(() => {
        // After Loading Animation Delay
        loading.current = false
        percent.set(0)
        opacity.set(0)

        setTimeout(() => {
          if (loadingContainerRef.current !== null) {
            loadingContainerRef.current.style.display = "none"
          }
          controls.stop()
        }, 1000)
      }, 1000)
    }

    if (timerToken.current !== 0 && active) {
      clearTimeout(timerToken.current)
      timerToken.current = 0
    }
  })

  return (
    <LoadingContainer center ref={loadingContainerRef}>
      <LoadingScreen style={{ opacity }} />
      <LoadingBar>
        <LoadingText style={{ opacity }}>
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              animate={controls}
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
        </LoadingText>
        <motion.div style={{ width }} />
      </LoadingBar>
    </LoadingContainer>
  )
}

export default SceneLoader
