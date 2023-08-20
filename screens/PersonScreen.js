import React, { useState, useEffect } from "react"
import { StyleSheet, View, Text, Dimensions, ScrollView, SafeAreaView, TouchableOpacity, Image } from "react-native"
import { ChevronLeftIcon } from "react-native-heroicons/outline"
import { HeartIcon } from "react-native-heroicons/solid"
import { useNavigation, useRoute } from "@react-navigation/native"
import MovieList from "../components/MovieList"
import Loading from "../components/Loading"

var {width, height} = Dimensions.get('window')
const ios = Platform.OS == 'ios'
const verticalMargin = ios ? 0 : 3

const PersonScreen = () => {
    const {params: item} = useRoute()
    const { container, safeArea, backButton, shadow, circular, name, location, detail, detailContainer, detailTitle, detailText, bio, bioText } = styles

    const [isFavourite, toggleFavourite] = useState(false)
    const [personMovies, setPersonMovies] = useState([1, 2, 3, 4])
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

    useEffect(() => {
        console.log('person log: ', item)
    },[item])

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
                                    source={require('../assets/margo.jpeg')}
                                    style={{height: '100%', width: '100%'}}
                                />
                            </View>
                        </View>
                        <View style={{marginTop: 5}}>
                            <Text style={name}>Margo Robbie</Text>
                            <Text style={location}>London, United Kingdom</Text>
                        </View>
                        <View 
                            style={detailContainer}>
                            <View style={detail}>
                                <Text style={detailTitle}>Gender</Text>
                                <Text style={detailText}>Male</Text>
                            </View>
                            <View style={detail}>
                                <Text style={detailTitle}>Birthday</Text>
                                <Text style={detailText}>1964-09-09</Text>
                            </View>
                            <View style={detail}>
                                <Text style={detailTitle}>Known for</Text>
                                <Text style={detailText}>Acting</Text>
                            </View>
                            <View style={{paddingHorizontal: 5, alignItems: 'center'}}>
                                <Text style={detailTitle}>Popularity</Text>
                                <Text style={detailText}>64.62</Text>
                            </View>
                        </View>
                        <View style={{margin: 5}}>
                            <Text style={bio}>Biography</Text>
                            <Text style={bioText}>Margot Elise Robbie is an Australian actress and producer. Known for her work in both blockbuster and independent films, she has received various accolades, including nominations for two Academy Awards, four Golden Globe Awards, and five British Academy Film Awards.</Text>
                        </View>
                        <MovieList title={'Movies'} data={personMovies} hideSeeAll={true} />
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
        marginTop: 5, 
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