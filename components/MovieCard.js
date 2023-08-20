import React from 'react'
import { TouchableWithoutFeedback, Dimensions, Image } from 'react-native'
import { fallBackMoviePoster, image500 } from '../api/moviedb'

var {width, height} = Dimensions.get('window')

const MovieCard = ({ item, handleClick }) => {
    return (
        <TouchableWithoutFeedback onPress={handleClick(item)}>
            <Image 
                // source={require('../assets/barbie.jpg')} 
                source={{uri: image500(item.poster_path) || fallBackMoviePoster}}
                style={{
                    width: width*0.6, 
                    height: height*0.4, 
                    borderRadius: 10
                }}
            />
        </TouchableWithoutFeedback>
    )
}

export default MovieCard