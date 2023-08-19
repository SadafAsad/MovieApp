import React, { useEffect, useState } from "react"
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Platform, Image } from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"
import { ChevronLeftIcon } from "react-native-heroicons/outline"
import { HeartIcon } from "react-native-heroicons/solid"
import { LinearGradient } from "expo-linear-gradient"
import Cast from "../components/Cast"

var {width, height} = Dimensions.get('window')
const ios = Platform.OS == 'ios'
const topMargin = ios ? 0 : 3

const MovieScreen = () => {
    const {params: item} = useRoute()
    const navigation = useNavigation()
    const [isFavourite, toggleFavourite] = useState(false)
    const [cast, setCast] = useState([1, 2, 3, 4])
    let movieName = "Oppenheimer"

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
            <View style={{marginTop: -(height*0.09)}}>
                <Text style={{color: 'white', alignSelf: 'center', fontSize: 20, fontWeight: 'bold', letterSpacing: 1}}>
                    {movieName}
                </Text>
                <Text style={{color: '#717573', fontWeight: 'bold', fontSize: 16, alignSelf: 'center'}}>
                        Released • 2023 • 170 min
                </Text>
                <View style={{flexDirection: 'row', justifyContent: 'center', margin: 4}}>
                    <Text style={{color: '#717573', alignSelf: 'center', fontWeight: 'bold'}}>Action • </Text>
                    <Text style={{color: '#717573', alignSelf: 'center', fontWeight: 'bold'}}>Thrill • </Text>
                    <Text style={{color: '#717573', alignSelf: 'center', fontWeight: 'bold'}}>Scientific</Text>
                </View>
                <Text style={{color: '#717573', margin: 4, letterSpacing: 1}}>
                    During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project. Oppenheimer and a team of scientists spend years developing and designing the atomic bomb. Their work comes to fruition on July 16, 1945, as they witness the world's first nuclear explosion, forever changing the course of history.
                </Text>
            </View>
            <Cast cast={cast} navigation={navigation} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({

})

export default MovieScreen