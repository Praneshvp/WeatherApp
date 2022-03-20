
import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store/store';
import ListItems from './src/screens/ListItems';
import Main from './src/screens/Main';
const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <ListItems />
      </SafeAreaView>

    </Provider>
  )
};



export default App;
