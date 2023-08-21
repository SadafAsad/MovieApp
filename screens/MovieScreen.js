import React, { useEffect, useState } from "react"
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Platform, Image } from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"
import { ChevronLeftIcon } from "react-native-heroicons/outline"
import { HeartIcon } from "react-native-heroicons/solid"
import { LinearGradient } from "expo-linear-gradient"
import Cast from "../components/Cast"
import MovieList from "../components/MovieList"
import Loading from "../components/Loading"
import axios from "axios"
import { fallBackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from "../api/moviedb"

var {width, height} = Dimensions.get('window')
const ios = Platform.OS == 'ios'
const topMargin = ios ? 0 : 3

const MovieScreen = () => {
    const { safeArea, backButton, poster, gradient, name, movieDetail, genreContainer, genreText, description } = styles

    const [isFavourite, toggleFavourite] = useState(false)
    const [loading, setLoading] = useState(true)
    const [movie, setMovie] = useState({})
    const [cast, setCast] = useState([])
    const [similarMovies, setSimilarMovies] = useState([])
    
    const {params: item} = useRoute()
    const navigation = useNavigation()

    let movieName = "Oppenheimer"

    useEffect(() => {
        getMovieDetails(item.id)
        getMovieCredits(item.id)
        getSimilarMovies(item.id)
    }, [item])

    const getMovieDetails = async id => {
        const data = await fetchMovieDetails(id)
        if (data) setMovie(data)
        setLoading(false)
    }
    const getMovieCredits = async id => {
        const data = await fetchMovieCredits(id)
        if (data && data.cast) setCast(data.cast)
    }
    const getSimilarMovies = async id => {
        const data = await fetchSimilarMovies(id)
        if (data && data.results) setSimilarMovies(data.results)
    }

    return (
        <ScrollView
            contentContainerStyle={{paddingBottom: 20}}
            style={{flex: 1, backgroundColor: 'rgba(23,23,23,1)'}}
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
                                // source={require('../assets/oppenheimer.jpg')}
                                source={{uri: image500(movie?.poster_path) || fallBackMoviePoster}}
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
                <Text style={name}>{movie?.title}</Text>
                {
                    movie?.id ? (
                        <Text style={movieDetail}>
                            {movie?.status} • {movie?.release_date.split('-')[0]} • {movie?.runtime} min
                        </Text>
                    ) : null
                }
                <View style={genreContainer}>
                    {
                        movie?.genres?.map((genre, index) => {
                            let showDot = index+1 != movie.genres.length
                            return (
                                <Text key={index} style={genreText}>{genre?.name} {showDot ? '•' : null} </Text>
                            )
                        })
                    }
                </View>
                <Text style={description}>{movie?.overview}</Text>
            </View>
            { cast.length>0 && <Cast cast={cast} navigation={navigation} /> }
            { similarMovies.length>0 && <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} /> }
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
        margin: 5
    },
    movieDetail: {
        color: 'gray', 
        fontWeight: 'bold', 
        fontSize: 16, 
        alignSelf: 'center',
        margin: 5
    },
    genreContainer: {
        flexDirection: 'row', 
        justifyContent: 'center',
        margin: 5
    },
    genreText: {
        color: 'gray', 
        alignSelf: 'center', 
        fontWeight: 'bold'
    },
    description: {
        color: 'gray',
        letterSpacing: 1,
        margin: 5,
        marginTop: 10
    }
})

export default MovieScreen