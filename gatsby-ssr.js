/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

import wrapWithProvider from "./src/state/wrapWithProvider.tsx"
export const wrapRootElement = wrapWithProvider
