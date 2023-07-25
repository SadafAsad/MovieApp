import React, { useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Platform, TouchableOpacity, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import TrendingMovies from './components/TrendingMovies'

const ios = Platform.OS == 'ios'

const HomeScreen = () => {
    const { container, safeArea, icons, logo, mDesign } = styles
    const [trending, setTrending] = useState([1, 2, 3])

    return (
        <View style={container}>
            <SafeAreaView style={ ios ? safeArea : marginBottom=3 }>
                <StatusBar style='light'/>
                <View style={icons}>
                    <Bars3CenterLeftIcon size={30} strokeWidth={2} color={'white'} />
                    <Text style={logo}>
                        <Text style={mDesign}>M</Text>ovies</Text>
                    <TouchableOpacity>
                        <MagnifyingGlassIcon size={30} strokeWidth={2} color={'white'} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 10}}
            >
                <TrendingMovies data={trending} />
            </ScrollView>
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
        marginHorizontal: 4
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