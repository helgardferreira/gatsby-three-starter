/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

import wrapWithProvider from "./src/state/wrapWithProvider.tsx"
export const wrapRootElement = wrapWithProvider
