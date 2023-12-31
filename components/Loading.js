import React from "react"
import { StyleSheet, View, Dimensions } from "react-native"
import * as Progress from 'react-native-progress'

var {width, height} = Dimensions.get('window')

const Loading = () => {
    return (
        <View style={{
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: width,
            height: height
        }}>
            <Progress.CircleSnail thickness={5} size={100} color={'#eab308'} />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default Loading