import React from "react"
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image, Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { fallBackMoviePoster, image185 } from "../api/moviedb"

var {width, height} = Dimensions.get('window')

const MovieList = ({ title, data, hideSeeAll }) => {
    const navigation = useNavigation()

    return ( 
        <View> 
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 10, marginRight: 10, marginLeft: 10}}>
                <Text style={{color: 'white', fontSize: 16}}>{title}</Text>
                {
                    !hideSeeAll && (
                        <TouchableOpacity>
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
                                        // source={require('../assets/oppenheimer.jpg')}
                                        source={{uri: image185(item.poster_path) || fallBackMoviePoster}}
                                        style={{width: width*0.33, height: height*0.22, borderRadius: 10}}
                                    />
                                    <Text style={{color: 'white', marginTop: 5}}>
                                        {item.title.length>14 ? item.title.slice(0,14)+'...' : item.title}
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