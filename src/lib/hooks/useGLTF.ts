import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import { useLoader } from "react-three-fiber"

function draco(url = "https://www.gstatic.com/draco/v1/decoders/") {
  return (loader: GLTFLoader) => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath(url)
    loader.setDRACOLoader(dracoLoader)
  }
}

export default function useGLTF<T>(path: string, useDraco = true): GLTF & T {
  const gltf = useLoader(
    GLTFLoader,
    path,
    useDraco
      ? draco(typeof useDraco === "string" ? useDraco : undefined)
      : undefined
  )
  return gltf as GLTF & T
}

useGLTF.preload = (path: string, useDraco = true) =>
  useLoader.preload(
    GLTFLoader,
    path,
    useDraco
      ? draco(typeof useDraco === "string" ? useDraco : undefined)
      : undefined
  )
