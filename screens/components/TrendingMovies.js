import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const TrendingMovies = ({ data }) => {
    const { container, textDesign } = styles
    return (
        <View style={container}>
            <Text style={textDesign}>Trending</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 8,
    },
    textDesign: {
        color: 'white',
        marginBottom: 5,
        fontSize: 20
    }
})

export default TrendingMovies