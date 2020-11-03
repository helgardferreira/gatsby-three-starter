import { MotionValue } from "framer-motion"
import { createContext } from "react"

export const MotionContext = createContext<MotionValue>(new MotionValue(null))
