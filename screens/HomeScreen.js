import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Platform, TouchableOpacity, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { MagnifyingGlassIcon, UserCircleIcon } from 'react-native-heroicons/outline'
import TrendingMovies from '../components/TrendingMovies'
import MovieList from '../components/MovieList'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/Loading'
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb'
import { checkAuthenticationState } from '../api/firebasedb'

const ios = Platform.OS == 'ios'

const HomeScreen = () => {
    const { container, safeArea, icons, logo, mDesign } = styles

    const [trending, setTrending] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [topRated, setTopRated] = useState([])
    const [loading, setLoading] = useState(true)

    const navigation = useNavigation()

    useEffect(() => {
        getTrendingMovies()
        getUpcomingMovies()
        getTopRatedMovies()
    }, [])

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies()
        if (data && data.results) setTrending(data.results)
        setLoading(false)
    }
    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies()
        if (data && data.results) setUpcoming(data.results)
    }
    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies()
        if (data && data.results) setTopRated(data.results)
    }

    return (
        <View style={container}>
            <SafeAreaView style={ ios ? safeArea : marginBottom=3 }>
                <StatusBar style='light'/>
                <View style={icons}>
                    <TouchableOpacity 
                        onPress={async () => {
                            const result = await checkAuthenticationState()
                            result.loggedIn ? navigation.navigate('Profile') : navigation.navigate('Login')
                        }}
                    >
                        <UserCircleIcon size={30} strokeWidth={2} color={'white'} />
                    </TouchableOpacity>
                    <Text style={logo}><Text style={mDesign}>M</Text>ovies</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size={30} strokeWidth={2} color={'white'} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {
                loading ? (
                    <Loading />
                ) : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: 10}}
                    >
                        { trending.length>0 && <TrendingMovies data={trending} /> }
                        <MovieList title="Upcoming" data={upcoming} hideSeeAll={false} />
                        <MovieList title="Top Rated" data={topRated} hideSeeAll={false} />
                    </ScrollView>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#262626'
    },
    safeArea: {
        marginBottom: -2
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10
    },
    logo: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold'
    },
    mDesign: {
        color: '#eab308'
    }
})

export default HomeScreen