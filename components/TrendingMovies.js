import React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import MovieCard from './MovieCard'
import { useNavigation } from '@react-navigation/native'

var {width, height} = Dimensions.get('window')

const TrendingMovies = ({ data }) => {
    const { container, textDesign } = styles
    const navigation = useNavigation()

    const handleClick = (item) => {
        navigation.navigate('Movie', item)
    }

    return (
        <View style={container}>
            <Text style={textDesign}>Trending</Text>
            <Carousel 
                data={data}
                renderItem={({item}) => <MovieCard handleClick={() => handleClick(item)}/>}
                firstItem={1}
                inactiveSlideOpacity={0.60}
                sliderWidth={width}
                itemWidth={width*0.62}
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