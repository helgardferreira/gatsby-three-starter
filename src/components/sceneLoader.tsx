import React, { FunctionComponent, useRef, useState } from "react"
import { motion, useSpring, useTransform } from "framer-motion"
import styled from "styled-components"
import { useSelector } from "react-redux"
import { LoadErrorState, LoadState } from "../state/reducers/loader.reducer"

const LoadingContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`

const StyledLoadingScreen = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #141414;
`

const StyledLoadingBar = styled.div`
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

const AnimatedText = styled(motion.h2)`
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

const AnimatedLoadingText: FunctionComponent = () => (
  <AnimatedText>
    {Array.from("LOADING...").map((letter, index) => (
      <motion.span
        key={index}
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
  </AnimatedText>
)

const SceneLoader: FunctionComponent = () => {
  // Reminder: useSelector automatically subscribes component to store
  const { active, progress } = useSelector<
    { loader: LoadState & LoadErrorState },
    { active: boolean; progress: number }
  >(({ loader: { active, progress } }) => ({
    active,
    progress,
  }))

  const percent = useSpring(0)
  const opacity = useSpring(1)
  const width = useTransform(percent, val => val * 4)

  percent.set(progress)

  const timerToken = useRef<number>(0)

  const [isVisible, setIsVisible] = useState(true)

  // Timeout delay logic for smoother transition from loading screen
  if (timerToken.current === 0 && !active) {
    timerToken.current = setTimeout(() => {
      percent.set(0)
      opacity.set(0)

      setTimeout(() => {
        setIsVisible(false)
      }, 1000)
    }, 1000)
  } else {
    clearTimeout(timerToken.current)
    timerToken.current = 0
  }

  return isVisible ? (
    <LoadingContainer>
      <StyledLoadingScreen style={{ opacity }}>
        <StyledLoadingBar>
          <AnimatedLoadingText />
          <motion.div style={{ width }} />
        </StyledLoadingBar>
      </StyledLoadingScreen>
    </LoadingContainer>
  ) : null
}

export default SceneLoader
