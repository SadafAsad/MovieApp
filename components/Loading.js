import React from "react"
import { StyleSheet, View, Dimensions } from "react-native"
import * as Progress from 'react-native-progress'

var {width, height} = Dimensions.get('window')

const Loading = () => {
    return (
        <View style={{
            width, 
            height,
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'center',
            alignSelf: 'center'
        }}>
            <Progress.CircleSnail thickness={12} size={160} color={'#eab308'} />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default Loading