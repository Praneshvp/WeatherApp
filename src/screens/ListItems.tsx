
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ImageStore, ImageBackground, FlatList, Dimensions, Alert } from 'react-native';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp,
} from '../utils/Dimensions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetails } from '../redux/actions/fetchAssets';
import NetworkError from './NetworkError';
import usePrevious from '../utils/usePrevious';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

const ListItems = () => {
    const weatherDet = useSelector(state => state.imageReducer.weatherDetails)
    const loader = useSelector(state => state.imageReducer.isLoading)
    const network = useSelector(state =>  state.networkReducer.connected)

    const [orientation, setOrientation] = useState(screenWidth < screenHeight ? 'PORTRAIT' : 'LANDSCAPE')
    const dispatch = useDispatch()

    useEffect(
        () => {
            dispatch(fetchDetails(network))
        },
        []
    )
    
    useEffect(() => {
        const subscription = Dimensions.addEventListener(
            "change",
            ({ window: { width, height }, }) => {
                if (width < height) {
                    setOrientation("PORTRAIT")
                } else {
                    setOrientation("LANDSCAPE")

                }
            }
        );
        return () => subscription?.remove();
    });

    const prevValue = usePrevious(network);
    useEffect(() => {
        if(prevValue !== network) {
            dispatch(fetchDetails(network))
        }
    }, [prevValue, network])




    const renderGrid = ({ item, index }) => {
        var getDateValue = new Date(item.date_txt.replace(/-/g, "/"));
        let setDate = getDateValue.getDate()

        return (
            <View style={orientation == 'LANDSCAPE' ? styles.cardLandscape : styles.card}>
                <Text style={orientation == 'LANDSCAPE' ? styles.celciusLandscape : styles.celciusStyle}>
                    {Math.round(Number(item.temp)) - 273}°
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={orientation == 'LANDSCAPE' ? [styles.celciusLandscape, {
                        marginTop: hp('2%'), marginLeft: hp('1%')
                    }] : [styles.celciusStyle, {
                        marginTop: hp('2%'), marginLeft: hp('1%')
                    }]}>
                        {setDate}
                    </Text>
                    <Image source={require('../assets/cloud.png')}
                        resizeMode='contain'
                        style={orientation ? [styles.imgL, {
                            marginTop: hp('2%')
                        }] : [styles.imgStyle, {
                            marginTop: hp('2%')
                        }]}>
                    </Image>
                </View>

            </View>
        )
    }
    if (loader) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontWeight: '400' }}>Loading...</Text>
            </View>
        )
    }
    else {

        return (
            <>
                <Text style={orientation == 'LANDSCAPE' ? styles.monthL : styles.month}>March</Text>
                <FlatList
                    data={weatherDet}
                    keyExtractor={(item, index) => {
                        return index.toString();
                    }}
                    renderItem={renderGrid}
                    numColumns={3}
                    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', }}
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                />
                <NetworkError/>
            </>

        )

    }


};

const styles = StyleSheet.create({
    logoStyle: {
        alignSelf: 'center',
        width: hp('18.5%'),
        height: hp('18.5%'),
        margin: hp('0.5%'),
        borderRadius: hp('0.7%'), backgroundColor: "lightgray"
    },
    //portrait
    month: {
        textAlign: 'right', marginRight: wp('4.7%'),
        fontSize: hp('4%'), marginBottom: hp('1%'),
        marginTop: hp('1%'), fontWeight: 'bold', color: 'blue'
    },

    imgStyle: {
        width: hp('7%'), height: hp('7%')
    },
    card: {
        backgroundColor: '#f3f4f8', width: wp('30%'), height: hp('15%'), margin: wp('0.2%'),
        borderColor: 'gray', borderWidth: wp('0.1%')
    },
    celciusStyle: {
        textAlign: 'right', fontSize: hp('2%'), marginTop: hp('1%'), marginRight: wp('2%'), fontWeight: 'bold', color: 'black'
    },

    //landscape
    monthL: {
        textAlign: 'right', fontSize: hp('4%'), marginBottom: hp('1%'),
        marginTop: hp('1%'), marginRight: wp('11%'), fontWeight: 'bold', color: 'blue'
    },
    imgL: {
        width: hp('7%'), height: hp('7%')
    },
    cardLandscape: {
        backgroundColor: '#f3f4f8', width: hp('26%'), height: wp('35%'), margin: wp('0.4%'),
        borderColor: 'gray', borderWidth: wp('0.1%')
    },
    celciusLandscape: {
        textAlign: 'right', fontSize: hp('3.0%'), marginTop: hp('1%'),
        marginRight: wp('2%'), fontWeight: 'bold', color: 'black'
    },

})
export default (ListItems)


