import Types from "../types/types"
import SQLite from 'react-native-sqlite-2'

const db = SQLite.openDatabase('local.db', '1.0', '', 1)

export function isLoading(bool: boolean) {
  return {
    type: Types.LOADER,
    isLoading: bool
  }
}

export function successfulFetch(data: any) {
  return {
    type: Types.FETCH_ASSETS_GRID,
    data
  }
}


export function fetchError(error: any) {
  return {
    type: Types.ERROR,
    error
  }
}


export function fetchDetails(network: any) {
  return async dispatch => {

    if (network) {
      try {

        dispatch(isLoading(true))

        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=M%C3%BCnchen,DE&appid=92d7b81b099d57154bd55d9472884403`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const resData = await response.json();

        db.transaction(function (txn) {
          txn.executeSql('DROP TABLE IF EXISTS WeatherDetails', [])
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS WeatherDetails(id INTEGER PRIMARY KEY NOT NULL, temp VARCHAR(30), date_txt VARCHAR(30))',
            []
          )

          let arr = []
          arr = resData.list
          for (let i = 0; i < arr.length; i++) {
            // console.log("result",arr[i])
            txn.executeSql(
              'INSERT INTO WeatherDetails (id, temp, date_txt) VALUES (?,?,?)',
              [i, arr[i].main.temp, arr[i].dt_txt],
              (txn, results) => {
                if (results.rowsAffected > 0) {
                  //  console.log('Data Inserted Successfully....');
                } else console.log('Error');
              }
            );
          }

          txn.executeSql('SELECT * FROM `WeatherDetails`', [], function (tx, res) {
            // console.log('item:', res.rows._array)
            dispatch(successfulFetch(res.rows._array))
            dispatch(isLoading(false))
          })
        })

      }

      catch (error) {
        dispatch(isLoading(false))
      }
    }
    //if no network
    else {
      db.transaction(function (txn) {
        txn.executeSql('SELECT * FROM `WeatherDetails`', [], function (tx, res) {
          console.log('item:', res.rows._array)
          dispatch(successfulFetch(res.rows._array))
          dispatch(isLoading(false))
        })
      })
    }
  }

}





