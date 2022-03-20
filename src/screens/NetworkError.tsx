
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { checkNetwork } from '../redux/actions/networkActions';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp,
} from '../utils/Dimensions';

class NetWorkError extends React.Component {

    componentDidMount() {
        this.props._netWorkConnection();
    }

    componentWillUnmount() {
        this.props._netWorkConnection();
    }

    render() {
        const { isConnected } = this.props

        return (
            !isConnected ?
                <View style={styles.networkContainer}>
                    <Text style={styles.networkText}>No network connection</Text>
                </View>
                :
               null
        )

    }

}

function mapStateToProps(state) {
    return {
        isConnected: state.networkReducer.connected,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        _netWorkConnection: () => dispatch(checkNetwork()),
    }
}

const styles = StyleSheet.create({

  //NETWORK ERROR
  networkContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    padding: hp('1%'),
    bottom: hp('0%'),
    width: wp('100%'),
    backgroundColor: "black",
    //borderRadius: hp('2%')

},
networkText: {

    fontSize: hp('1.8%'),
    fontFamily: 'System',
    fontWeight: '400',
    color: "white", alignContent: 'center', justifyContent: 'center', textAlign: 'center'

},
})
export default connect(mapStateToProps, mapDispatchToProps)(NetWorkError)
