import { Store } from "redux"
import { DefaultLoadingManager } from "three"
import { LoaderAction } from "./reducers/loader.reducer"

export default (store: Store) => {
  DefaultLoadingManager.onStart = (item, loaded, total) =>
    store.dispatch<LoaderAction>({
      type: "UPDATE_LOADER",
      active: true,
      item,
      loaded,
      total,
      progress: (loaded / total) * 100,
    })

  DefaultLoadingManager.onLoad = () =>
    store.dispatch<LoaderAction>({ type: "FINISH_LOADER" })

  DefaultLoadingManager.onError = item =>
    store.dispatch<LoaderAction>({
      type: "ERR_LOADER",
      error: item,
    })

  DefaultLoadingManager.onProgress = (item, loaded, total) =>
    store.dispatch<LoaderAction>({
      type: "UPDATE_LOADER",
      active: true,
      item,
      loaded,
      total,
      progress: (loaded / total) * 100,
    })
}
