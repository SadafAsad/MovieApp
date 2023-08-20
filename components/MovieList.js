import React from "react"
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image, Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"

var {width, height} = Dimensions.get('window')

const MovieList = ({ title, data, hideSeeAll }) => {
    const navigation = useNavigation()

    let movieName = "Oppenheimer"

    return ( 
        <View> 
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10}}>
                <Text style={{color: 'white', fontSize: 16, marginTop: 5, marginLeft: 5, marginBottom: 5}}>{title}</Text>
                {
                    !hideSeeAll && (
                        <TouchableOpacity style={{marginRight: 5}}>
                            <Text style={{color: '#eab308'}}>See All</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 15}}
            >
                {
                    data.map((item, index) => {
                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onpress={() => navigation.push('Movie', item)}
                            >
                                <View style={{margin: 4}}>
                                    <Image 
                                        source={require('../assets/oppenheimer.jpg')}
                                        style={{width: width*0.33, height: height*0.22, borderRadius: 10}}
                                    />
                                    <Text style={{color: 'white', marginTop: 5}}>
                                        {movieName.length>14 ? movieName.slice(0,14)+'...' : movieName}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default MovieList