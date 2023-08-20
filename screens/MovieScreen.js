import React, { useEffect, useState } from "react"
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Platform, Image } from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"
import { ChevronLeftIcon } from "react-native-heroicons/outline"
import { HeartIcon } from "react-native-heroicons/solid"
import { LinearGradient } from "expo-linear-gradient"
import Cast from "../components/Cast"
import MovieList from "../components/MovieList"
import Loading from "../components/Loading"

var {width, height} = Dimensions.get('window')
const ios = Platform.OS == 'ios'
const topMargin = ios ? 0 : 3

const MovieScreen = () => {
    const { safeArea, backButton, poster, gradient, name, movieDetail, genreContainer, genre, description } = styles

    const [isFavourite, toggleFavourite] = useState(false)
    const [cast, setCast] = useState([1, 2, 3, 4])
    const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4])
    const [loading, setLoading] = useState(false)
    
    const {params: item} = useRoute()
    const navigation = useNavigation()

    let movieName = "Oppenheimer"

    useEffect(() => {

    }, [item])

    return (
        <ScrollView
            contentContainerStyle={{paddingBottom: 20}}
            style={{flex: 1, backgroundColor: '#232323'}}
        >
            <View style={{width: width}}>
                <SafeAreaView style={safeArea}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={backButton}
                    >
                        <ChevronLeftIcon size='28' strokeWidth={2.5} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)} style={{marginRight: 5}}>
                        <HeartIcon size='35' color={isFavourite ? 'red' : 'white'} />
                    </TouchableOpacity>
                </SafeAreaView>
                {
                    loading ? (
                        <Loading />
                    ) : (
                        <View>
                            <Image 
                                source={require('../assets/oppenheimer.jpg')}
                                style={poster}
                            />
                            <LinearGradient
                                colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                                style={gradient}
                                start={{x: 0.5, y: 0}}
                                end={{x: 0.5, y: 1}}
                            />
                        </View>
                    )
                }
            </View>
            <View style={{marginTop: -(height*0.09)}}>
                <Text style={name}>{movieName}</Text>
                <Text style={movieDetail}>Released • 2023 • 170 min</Text>
                <View style={genreContainer}>
                    <Text style={genre}>Action • </Text>
                    <Text style={genre}>Thrill • </Text>
                    <Text style={genre}>Scientific</Text>
                </View>
                <Text style={description}>
                    During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project. Oppenheimer and a team of scientists spend years developing and designing the atomic bomb. Their work comes to fruition on July 16, 1945, as they witness the world's first nuclear explosion, forever changing the course of history.
                </Text>
            </View>
            <Cast cast={cast} navigation={navigation} />
            <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        width: width,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 4,
        zIndex: 20,
        marginTop: {topMargin}
    },
    backButton: {
        borderRadius: 10, 
        padding: 1, 
        backgroundColor: '#eab308',
        marginLeft: 5
    },
    poster: {
        width: width, 
        height: height*0.55
    },
    gradient: {
        width: width, 
        height: height*0.4, 
        position: 'absolute', 
        bottom: 0
    },
    name: {
        color: 'white', 
        alignSelf: 'center', 
        fontSize: 20, 
        fontWeight: 'bold', 
        letterSpacing: 1,
        margin: 1
    },
    movieDetail: {
        color: '#717573', 
        fontWeight: 'bold', 
        fontSize: 16, 
        alignSelf: 'center',
        margin: 1
    },
    genreContainer: {
        flexDirection: 'row', 
        justifyContent: 'center',
        margin: 1
    },
    genre: {
        color: '#717573', 
        alignSelf: 'center', 
        fontWeight: 'bold'
    },
    description: {
        color: '#717573',
        letterSpacing: 1,
        margin: 5,
        marginTop: 10
    }
})

export default MovieScreen