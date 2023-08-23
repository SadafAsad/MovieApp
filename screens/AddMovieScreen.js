import React, { useCallback, useState, useEffect } from "react"
import { StyleSheet, View, SafeAreaView, Dimensions, TextInput, TouchableOpacity, ScrollView, Text, TouchableWithoutFeedback, Image } from "react-native"
import { XMarkIcon } from "react-native-heroicons/outline"
import { useNavigation, useRoute } from "@react-navigation/native"
import Loading from "../components/Loading"
import { debounce } from 'lodash'
import { fallBackMoviePoster, image185, searchMovie, fetchTrendingMovies } from "../api/moviedb"
import { PlusIcon, ClockIcon, HeartIcon } from "react-native-heroicons/outline"
import { updateFavourites, updateToWatch, updateWatched } from "../api/firebasedb"

var {width, height} = Dimensions.get('window')

const AddMovieScreen = () => {
    const { searchArea, searchInput, cancel, container, poster, name, movieContainer } = styles

    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [toList, setToList] = useState('')
    
    const navigation = useNavigation()
    const {params: item} = useRoute()

    useEffect(() => {
        getTrendingMovies()
        setToList(item.to)
    },[])
    
    const handleSearch = value => {
        if (value && value.length>2){
            setLoading(true)
            searchMovie({
                query: value,
                include_adult: 'false',
                language: 'en-US',
                page: '1'
            }).then(data => {
                setLoading(false)
                if (data && data.results) setResults(data.results)
            })
        } else {
            getTrendingMovies()
        }
    }
    const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies()
        if (data && data.results) setResults(data.results)
        setLoading(false)
    }

    const addMovieToUserList = (mid) => {
        if (toList=='Favourites') {
            updateFavourites(item.user, mid)
        }
        else if (toList=='Watched') {
            updateWatched(item.user, mid)
        }
        else {
            updateToWatch(item.user, mid)
        }
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#262626'}}>
            <View style={searchArea}>
                <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder="Search Movie"
                    placeholderTextColor={'gray'}
                    style={searchInput}
                />
                <TouchableOpacity onPress={() => navigation.goBack()} style={cancel}>
                    <XMarkIcon size='25' color='white' />
                </TouchableOpacity>
            </View>
            {
                loading ? (
                    <Loading />
                ) : (
                    results.length>0 ? (
                        <ScrollView
                            vertical
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{paddingVertical: 15}}
                        >
                            {
                                results.map((item, index) => {
                                    return (
                                        <View style={container}>
                                            <View style={movieContainer}>
                                                <Image
                                                    source={{uri: image185(item?.poster_path) || fallBackMoviePoster}}
                                                    style={poster}
                                                />
                                                <Text style={name}>{item?.title?.length>22 ? item?.title?.slice(0,22)+'...' : item?.title}</Text>
                                            </View>
                                            <TouchableOpacity onPress={addMovieToUserList(item?.movie_id)}>
                                                { toList=='Favourites' && <HeartIcon size='30' color={'white'} /> }
                                                { toList=='Watched' && <PlusIcon size='30' color={'white'} /> }
                                                { toList=='TBW' && <ClockIcon size='30' color={'white'} /> }
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })
                            }
                        </ScrollView>
                    ) : (
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Image 
                                style={{width: 200, height: 200}}
                                source={require('../assets/movietime.png')}
                            />
                        </View>
                    )
                )
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    searchArea: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        borderRadius: 50,
        borderColor: 'gray',
        borderWidth: 1
    },
    searchInput: {
        flex: 1,
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: 1,
        margin: 5
    },
    cancel: {
        borderRadius: 50,
        backgroundColor: 'gray',
        padding: 5
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 10,
        marginRight: 10
    },
    poster: {
        width: width*0.15,
        height: height*0.1
    },
    name: {
        color: 'white',
        margin: 10,
        fontWeight: 'bold',
        fontSize: 16
    },
    movieContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default AddMovieScreen