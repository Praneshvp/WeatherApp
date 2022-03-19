
import * as React from 'react';
import { Image, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../utils/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ListItems from './ListItems'
import Profile from './Profile'

const Tab = createBottomTabNavigator();

export default function TabRoutes() {

  return (

    <NavigationContainer>

      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: Colors.THEME,
          tabBarInactiveTintColor: Colors.BLACK,
        }}
      >
        <Tab.Screen name="Home" component={ListItems}
          options={({ route }) => ({
            headerStyle:{
              backgroundColor: Colors.THEME
            },
            headerTitleStyle:{
              color: Colors.WHITE
            },
            tabBarIcon: ({ focused, color }) => (
              focused ?
                <Image source={require('../assets/home.png')} style={{
                  width: hp('3%'), height: hp('3%'),
                  tintColor: Colors.THEME
                }} />
                :
                <Image source={require('../assets/home.png')} style={{ width: hp('3%'), height: hp('3%') }} />
            ),
          })} />



        <Tab.Screen name="Messages" component={Profile}
          options={({ route }) => ({
            headerStyle:{
              backgroundColor: Colors.THEME
            },
            headerTitleStyle:{
              color: Colors.WHITE
            },
            tabBarIcon: ({ focused, color }) => (
              focused ?
                <Image source={require('../assets/profile.png')} style={{
                  width: hp('3%'), height: hp('3%'),
                  tintColor: Colors.THEME
                }} />
                :
                <Image source={require('../assets/profile.png')} style={{ width: hp('3%'), height: hp('3%') }} />
            ),
          })} />



      </Tab.Navigator>
    </NavigationContainer>

  );
}

