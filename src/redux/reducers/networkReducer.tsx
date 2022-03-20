
const INITIAL_STATE={
    connected: true,
  }

export default function networkReducer(state = INITIAL_STATE, action)  {
    // console.log("networkReducer", action)

    switch(action.type){
        case 'NONETWORK':{
          return{
              ...state,
            connected: action.connectedVal,
          }
          break;
        }
        case 'NETWORKAVAIL':{
            return{
                ...state,
              connected: action.connectedVal
            }
            break;
          }
      }
      return state;

  }
