import { useLoader } from "react-three-fiber"
import { Texture, TextureLoader } from "three"

export default function useTexture(url: string): Texture {
  return useLoader(TextureLoader, url)
}

useTexture.preload = (url: string) => useLoader.preload(TextureLoader, url)
