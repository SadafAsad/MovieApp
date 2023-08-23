import React, { useState, useEffect } from "react"
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Platform, Image } from "react-native"
import { useRoute, useNavigation, StackActions } from "@react-navigation/native"
import { ChevronLeftIcon, ArrowLeftOnRectangleIcon } from "react-native-heroicons/outline"
import { LinearGradient } from "expo-linear-gradient"
import MovieList from "../components/MovieList"
import Loading from "../components/Loading"
import { getUserByUID, signOutUser } from "../api/firebasedb"

var {width, height} = Dimensions.get('window')
const ios = Platform.OS == 'ios'
const topMargin = ios ? 0 : 3

const ProfileScreen = () => {
    const { safeArea, backButton, poster, gradient, name, movieDetail, genreContainer, genreText, description } = styles

    const [loading, setLoading] = useState(false)
    const [favouriteMovies, setFavouriteMovies] = useState([])
    const [watchedMovies, setWatchedMovies] = useState([])
    const [toWatchMovies, SetToWatchMovies] = useState([])
    
    const {params: item} = useRoute()
    const navigation = useNavigation()

    useEffect( () => {
        getUserByUID(item.userID).then((userData) => {
            if (userData) {
              console.log('User data:', userData);
            } else {
              console.log('User not found');
            }
        })
    },[])

    return (
        <ScrollView
            contentContainerStyle={{paddingBottom: 20}}
            style={{flex: 1, backgroundColor: 'rgba(23,23,23,1)'}}
        >
            <View style={{width: width}}>
                <SafeAreaView style={safeArea}>
                    <TouchableOpacity
                        onPress={() => navigation.dispatch(StackActions.popToTop())}
                        style={backButton}
                    >
                        <ChevronLeftIcon size='28' strokeWidth={2.5} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => {
                            signOutUser()
                            navigation.dispatch(StackActions.popToTop())
                        }}
                        style={{marginRight: 5}}
                    >
                        <ArrowLeftOnRectangleIcon size='35' color={'white'} />
                    </TouchableOpacity>
                </SafeAreaView>
                {
                    loading ? (
                        <Loading />
                    ) : (
                        <View>
                            <Image 
                                source={require('../assets/oppenheimer.jpg')}
                                // source={{uri: image500(movie?.poster_path) || fallBackMoviePoster}}
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
                <Text style={name}>Sadaf Asad</Text>
                <View style={genreContainer}>
                    <Text style={movieDetail}>Following 100</Text>
                    <Text style={movieDetail}>Follower 20</Text>
                </View>
            </View>
            {/* <MovieList title="Favourites" hideSeeAll={true} data={favouriteMovies} />
            <MovieList title="Watched" hideSeeAll={true} data={watchedMovies} />
            <MovieList title="TBW" hideSeeAll={true} data={toWatchMovies} /> */}
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
        height: height*0.3
    },
    gradient: {
        width: width, 
        height: height*0.2, 
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
    }
})

export default ProfileScreen