import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import MovieCard from './MovieCard'

const TrendingMovies = ({ data }) => {
    const { container, textDesign } = styles
    return (
        <View style={container}>
            <Text style={textDesign}>Trending</Text>
            <Carousel 
                data={data}
                renderItem={({item}) => <MovieCard item={item} />}
                firstItem={1}
                inactiveSlideOpacity={0.60}
                sliderWidth={600}
                itemWidth={400}
                slideStyle={{display: 'flex', alignItems: 'center'}}
            />
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