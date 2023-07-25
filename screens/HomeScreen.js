import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Bars3CenterLeftIcon } from 'react-native-heroicons/outline'

const ios = Platform.OS == 'ios'

const HomeScreen = () => {
    const { container, safeArea, icons, logo } = styles
    return (
        <View style={container}>
            <SafeAreaView style={ ios ? safeArea : marginBottom=3 }>
                <StatusBar style='light'/>
                <View style={icons}>
                    <Bars3CenterLeftIcon size={30} strokeWidth={2} color={'white'} />
                    <Text style={logo}>Movies</Text>
                </View>
            </SafeAreaView>
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
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default HomeScreen