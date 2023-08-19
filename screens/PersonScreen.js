import React, { useState } from "react"
import { StyleSheet, View, Text, Dimensions, ScrollView, SafeAreaView, TouchableOpacity } from "react-native"
import { ChevronLeftIcon } from "react-native-heroicons/outline"
import { HeartIcon } from "react-native-heroicons/solid"

var {width, height} = Dimensions.get('window')
const ios = Platform.OS == 'ios'
const verticalMargin = ios ? 0 : 3

const PersonScreen = () => {
    const [isFavourite, toggleFavourite] = useState(false)

    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: '#262626',
                paddingBottom: 20
            }}
        >
            <SafeAreaView
                style={{
                    width: width,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 4,
                    zIndex: 20,
                    marginVertical: {verticalMargin}
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{borderRadius: 10, padding: 1, backgroundColor: '#eab308'}}
                >
                    <ChevronLeftIcon size='28' strokeWidth={2.5} color='white' />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                    <HeartIcon size='35' color={isFavourite ? 'red' : 'white'} />
                </TouchableOpacity>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

})

export default PersonScreen