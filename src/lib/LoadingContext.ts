import { createContext, MutableRefObject } from "react"

export const LoadingContext = createContext<MutableRefObject<boolean>>({
  current: false,
})
