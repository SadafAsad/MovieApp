import React from "react"
import { StyleSheet, View, Text, SafeAreaView } from "react-native"

const LoginScreen = () => {
    const { container, logo, mDesign } = styles

    return (
        <View style={container}>
            <Text style={logo}><Text style={mDesign}>M</Text>ovies</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#262626'
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

export default LoginScreen