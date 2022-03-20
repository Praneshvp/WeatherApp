import NetInfo from "@react-native-community/netinfo";


export function noNetwork(connectedVal) {
    return {
        type: 'NONETWORK',
        connectedVal
    }
}
export function networkAvailable(connectedVal) {
    return {
        type: 'NETWORKAVAIL',
        connectedVal
    }
}

export function checkNetwork() {

    return dispatch => {
        NetInfo.addEventListener(state => {
            // console.log('Is connected?', state);
      
            const connection = state.isConnected;

            if(connection){
                dispatch(networkAvailable(connection))
            }
            else{
                dispatch(noNetwork(connection))
            }
          });
        }
}