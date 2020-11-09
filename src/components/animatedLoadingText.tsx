import React, { FunctionComponent } from "react"
import { motion } from "framer-motion"
import styled from "styled-components"

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

export default AnimatedLoadingText
