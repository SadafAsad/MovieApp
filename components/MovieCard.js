import React from 'react'
import { TouchableWithoutFeedback, Dimensions, Image } from 'react-native'

var {width, height} = Dimensions.get('window')

const MovieCard = ({ item, handleClick }) => {
    return (
        <TouchableWithoutFeedback onPress={handleClick(item)}>
            <Image 
                source={require('../assets/barbie.jpg')} 
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