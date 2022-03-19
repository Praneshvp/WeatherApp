
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ImageStore, ImageBackground, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages } from '../redux/actions/fetchAssets';
import Carousel from 'react-native-snap-carousel';

const ListItems = () => {
    const carousalArr = useSelector(state => state.imageReducer.carousalAssets)
    const gridArr = useSelector(state => state.imageReducer.gridAssets)
    const loader = useSelector(state => state.imageReducer.isLoading)

    const [activeSilde, setactiveSlide] = useState(1)

    const dispatch = useDispatch()

    useEffect(
        () => {
            Promise.all([
                dispatch(fetchImages(5)),
                dispatch(fetchImages(20))
            ]);
        },
        []
    )
    const renderItem = ({ item, index }) => {
        // console.log(item)

        return (
            <View key={item.id}>
                <ImageBackground
                    source={{ uri: item.image }}
                    imageStyle={{ borderRadius: hp('2%'), }}
                    style={{
                        width: wp('75%'), margin: hp('1'),
                        height: hp('30%'), backgroundColor:"lightgray"
                    }}
                >

                </ImageBackground>

            </View>
        )
    }

    const renderGrid = ({ item, index }) => {
        return (
            <Image resizeMode='cover' source={{ uri: item.image }}
                style={styles.logoStyle} />
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
            <View style={{ flex: 1, }}>
                <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                    <Carousel
                        data={carousalArr}
                        renderItem={renderItem}
                        onSnapToItem={(index) => setactiveSlide(index)}
                        firstItem={1}
                        sliderWidth={wp('100%')}
                        itemWidth={wp('75%')}
                    >
                    </Carousel>
                </View>
                <View style={{ flex: 6, marginBottom: hp('1%'), marginTop: hp('0.7%') }}>
                    <FlatList
                        data={gridArr}
                        keyExtractor={(item, index) => {
                            return index.toString();
                        }}
                        renderItem={renderGrid}
                        numColumns={2}
                        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', }}
                        scrollEnabled={true}
                        showsVerticalScrollIndicator={false}
                    />
                </View>

            </View>
        )

    }


};

const styles = StyleSheet.create({
    logoStyle: {
        alignSelf: 'center',
        width: hp('18.5%'),
        height: hp('18.5%'),
        margin: hp('0.5%'),
        borderRadius: hp('0.7%'), backgroundColor:"lightgray"
    }
})
export default (ListItems)


