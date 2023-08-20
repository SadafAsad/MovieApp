import React, { useState, useEffect } from "react"
import { StyleSheet, View, Text, Dimensions, ScrollView, SafeAreaView, TouchableOpacity, Image } from "react-native"
import { ChevronLeftIcon } from "react-native-heroicons/outline"
import { HeartIcon } from "react-native-heroicons/solid"
import { useNavigation, useRoute } from "@react-navigation/native"
import MovieList from "../components/MovieList"
import Loading from "../components/Loading"
import { fallBackPersonImage, fetchPersonDetails, fetchPersonMovies, image342, image500 } from "../api/moviedb"

var {width, height} = Dimensions.get('window')
const ios = Platform.OS == 'ios'
const verticalMargin = ios ? 0 : 3

const PersonScreen = () => {
    const {params: item} = useRoute()
    const { container, safeArea, backButton, shadow, circular, name, location, detail, detailContainer, detailTitle, detailText, bio, bioText } = styles

    const [isFavourite, toggleFavourite] = useState(false)
    const [person, setPerson] = useState([])
    const [personMovies, setPersonMovies] = useState({})
    const [loading, setLoading] = useState(true)

    const navigation = useNavigation()

    useEffect(() => {
        getPersonDetails(item.id)
        // getPersonMovies(item.id)
    },[item])

    const getPersonDetails = async id => {
        const data = await fetchPersonDetails(id)
        if (data) setPerson(data)
        setLoading(false)
    }
    const getPersonMovies = async id => {
        const data = await fetchPersonMovies(id)
        if (data) setPersonMovies()
    }

    return (
        <ScrollView style={container}>
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
                        <View style={shadow}>
                            <View style={circular}>
                                <Image
                                    // source={require('../assets/margo.jpeg')}
                                    source={{uri: image342(person?.profile_path) || fallBackPersonImage}}
                                    style={{height: '100%', width: '100%'}}
                                />
                            </View>
                        </View>
                        <View style={{marginTop: 5}}>
                            <Text style={name}>{person?.name}</Text>
                            <Text style={location}>{person?.place_of_birth}</Text>
                        </View>
                        <View 
                            style={detailContainer}>
                            <View style={detail}>
                                <Text style={detailTitle}>Gender</Text>
                                <Text style={detailText}>{person?.gender==1 ? 'Female' : 'Male'}</Text>
                            </View>
                            <View style={detail}>
                                <Text style={detailTitle}>Birthday</Text>
                                <Text style={detailText}>{person?.birthday}</Text>
                            </View>
                            <View style={detail}>
                                <Text style={detailTitle}>Known for</Text>
                                <Text style={detailText}>{person?.known_for_department}</Text>
                            </View>
                            <View style={{paddingHorizontal: 5, alignItems: 'center'}}>
                                <Text style={detailTitle}>Popularity</Text>
                                <Text style={detailText}>{person?.popularity.toFixed(2)} %</Text>
                            </View>
                        </View>
                        <View style={{margin: 10}}>
                            <Text style={bio}>Biography</Text>
                            <Text style={bioText}>{person?.biography || 'N/A'}</Text>
                        </View>
                        {/* <MovieList title={'Movies'} data={personMovies} hideSeeAll={true} /> */}
                    </View>
                )
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#262626',
        paddingBottom: 20
    },
    safeArea: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 4,
        zIndex: 20,
        marginVertical: {verticalMargin}
    },
    backButton: {
        borderRadius: 10, 
        padding: 1, 
        backgroundColor: '#eab308',
        marginLeft: 5
    },
    shadow: {
        flexDirection: 'row',
        justifyContent: 'center',
        shadowColor: 'gray',
        shadowRadius: 40,
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 1
    },
    circular: {
        alignItems: 'center',
        width: 250,
        height: 250,
        borderRadius: 125,
        overflow: 'hidden',
        justifyContent: 'center',
        borderColor: '#ccc', 
        borderWidth: 2
    },
    name: {
        fontSize: 20, 
        color: 'white', 
        fontWeight: 'bold', 
        alignSelf: 'center'
    },
    location: {
        fontSize: 15,
        color: 'gray', 
        fontWeight: 'bold', 
        alignSelf: 'center', 
        margin: 4
    },
    detailContainer: {
        marginHorizontal: 5, 
        marginTop: 10, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        backgroundColor: 'gray',
        borderRadius: 50,
        padding: 8
    },
    detail: {
        borderRightWidth: 1, 
        paddingHorizontal: 5, 
        alignItems: 'center', 
        borderColor: 'lightgray'
    },
    detailTitle: {
        color: 'white', 
        fontWeight: 'bold'
    },
    detailText: {
        color: 'lightgray', 
        fontSize: 15
    },
    bio: {
        color: 'white', 
        fontSize: 18
    },
    bioText: {
        color: 'gray', 
        letterSpacing: 1, 
        marginTop: 5
    }
})

export default PersonScreen