
import React from 'react';
import { View, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../utils/Colors';
const Profile = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{fontFamily:'System', fontSize: hp('2%'), color: Colors.BLACK, fontWeight:'500'}}>Messages</Text>
    </View>
  )
};


export default Profile;
