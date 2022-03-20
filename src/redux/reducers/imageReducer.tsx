import Types from "../types/types";

const INITIAL_STATE = {
  isLoading: true,
  weatherDetails: [],
  error: null
}

export default function imageReducer(state = INITIAL_STATE, action) {
  // console.log(action.type);
  switch (action.type) {
    case Types.LOADER:
      return {
        ...state,
        isLoading: action.isLoading,
      }
      break;
    case Types.FETCH_ASSETS_GRID:
      return {
        ...state,
        weatherDetails: action.data,
      }
      break;
    case Types.ERROR:
      return {
        ...state,
        error: action.error
      }
      break;
    default:
      return state
  }

}