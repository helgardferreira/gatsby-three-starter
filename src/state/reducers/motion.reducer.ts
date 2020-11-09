import { Reducer } from "react"

export interface MotionState {
  handMotionValue: number
}

export const UPDATE_MOTION = "UPDATE_MOTION"

export interface UpdateMotionAction extends MotionState {
  type: typeof UPDATE_MOTION
}

// Placeholder for union action
export type MotionAction = UpdateMotionAction

const motionReducer: Reducer<MotionState, MotionAction> = (
  state = {
    handMotionValue: 1,
  },
  action
): MotionState => {
  switch (action.type) {
    case UPDATE_MOTION:
      return action
    default:
      return state
  }
}

export default motionReducer
