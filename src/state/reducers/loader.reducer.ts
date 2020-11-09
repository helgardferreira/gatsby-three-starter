import { Reducer } from "react"

export interface LoadState {
  active: boolean
  progress: number
  item: string
  loaded: number
  total: number
}

export interface LoadErrorState {
  errors: string[]
}

export const UPDATE_LOADER = "UPDATE_LOADER"
export const FINISH_LOADER = "FINISH_LOADER"
export const ERR_LOADER = "ERR_LOADER"

export interface UpdateLoaderAction extends LoadState {
  type: typeof UPDATE_LOADER
}

export interface FinishLoaderAction {
  type: typeof FINISH_LOADER
}

export interface ErrLoaderAction {
  type: typeof ERR_LOADER
  error: string
}

export type LoaderAction =
  | UpdateLoaderAction
  | FinishLoaderAction
  | ErrLoaderAction

const loaderReducer: Reducer<LoadState & LoadErrorState, LoaderAction> = (
  state = {
    errors: [],
    active: true,
    progress: 0,
    item: "",
    loaded: 0,
    total: 0,
  },
  action
): LoadState & LoadErrorState => {
  switch (action.type) {
    case UPDATE_LOADER:
      return { ...state, ...action }
    case FINISH_LOADER:
      return { ...state, active: false }
    case ERR_LOADER:
      return { ...state, errors: state.errors.concat(action.error) }
    default:
      return state
  }
}

export default loaderReducer
