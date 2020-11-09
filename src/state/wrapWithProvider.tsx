import React, { ReactNode } from "react"
import { Provider } from "react-redux"

// import configureStore from "./index"
import store from "./index"

interface WrapperProps {
  element: ReactNode
}

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }: WrapperProps) => {
  // Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts

  // const store = configureStore()
  return <Provider store={store}>{element}</Provider>
}
