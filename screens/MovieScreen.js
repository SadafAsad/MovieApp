import React, { useEffect, useState } from "react"
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Platform, Image } from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"
import { ChevronLeftIcon } from "react-native-heroicons/outline"
import { HeartIcon } from "react-native-heroicons/solid"
import { LinearGradient } from "expo-linear-gradient"

var {width, height} = Dimensions.get('window')
const ios = Platform.OS == 'ios'
const topMargin = ios ? 0 : 3

const MovieScreen = () => {
    const {params: item} = useRoute()
    const navigation = useNavigation()
    const [isFavourite, toggleFavourite] = useState(false)

    useEffect(() => {

    }, [item])

    return (
        <ScrollView
            contentContainerStyle={{paddingBottom: 20}}
            style={{flex: 1, backgroundColor: '#262626'}}
        >
            <View style={{width: width}}>
                <SafeAreaView
                    style={{
                        width: width,
                        position: 'absolute',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: 4,
                        zIndex: 20,
                        marginTop: {topMargin}
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{borderRadius: 10, padding: 1, backgroundColor: '#eab308'}}
                    >
                        <ChevronLeftIcon size='28' strokeWidth={2.5} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                        <HeartIcon size='35' color={isFavourite ? 'red' : 'white'} />
                    </TouchableOpacity>
                </SafeAreaView>
                <View>
                    <Image 
                        source={require('../assets/oppenheimer.jpg')}
                        style={{
                            width: width,
                            height: height*0.55
                        }}
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                        style={{width: width, height: height*0.4, position: 'absolute', bottom: 0}}
                        start={{x: 0.5, y: 0}}
                        end={{x: 0.5, y: 1}}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

})

export default MovieScreen