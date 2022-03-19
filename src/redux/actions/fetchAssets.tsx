import { Alert } from "react-native"
import Types from "../types/types"



export function isLoading(bool: boolean) {
  return {
    type: Types.LOADER,
    isLoading: bool
  }
}

export function successfulFetch(data, count ) {
  return {
    type: count === 5 ? Types.FETCH_ASSETS_CAROUSAL : Types.FETCH_ASSETS_GRID,
    data
  }
}


export function fetchError(error: any) {
  return {
    type: Types.ERROR,
    error
  }
}


export  function fetchImages(count) {
  return async dispatch => {

    try {

      dispatch(isLoading(true))


      const response = await fetch(`https://shibe.online/api/shibes?count=${count}&urls=true&httpsUrls=true`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData = await response.json();
        let string = JSON.stringify(resData)
        string = string.substring(1, string.length - 1);
        let arr = string.split(',')
        // console.log("result",arr)
        let newArr = []
        for(let i = 0 ; i<arr.length ; i++){
          newArr.push({id:i, image: arr[i].substring(1, arr[i].length - 1)})
        }
        // console.log("newArr",newArr)
         dispatch(successfulFetch(newArr, count))
         dispatch(isLoading(false))


    } catch (error) {
      dispatch(isLoading(false))
      Alert.alert(
        //title
        '',
        //body
        'Error',
        [
            {
                text: 'OK', onPress: () => {
                }
            },
        ],
        { cancelable: false }
    )    }
  }

}





