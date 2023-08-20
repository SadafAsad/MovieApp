import React, { useState } from "react"
import { StyleSheet, View, SafeAreaView, Dimensions, TextInput, TouchableOpacity, ScrollView, Text, TouchableWithoutFeedback, Image } from "react-native"
import { XMarkIcon } from "react-native-heroicons/outline"
import { useNavigation } from "@react-navigation/native"
import Loading from "../components/Loading"

var {width, height} = Dimensions.get('window')

const SearchScreen = () => {
    const { searchArea, searchInput, cancel } = styles

    const [results, setResults] = useState([1, 2, 3, 4, 5])
    const [loading, setLoading] = useState(false)
    
    const navigation = useNavigation()
    
    let movieName = 'Barbie'

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#262626'}}>
            <View style={searchArea}>
                <TextInput
                    placeholder="Search Movie"
                    placeholderTextColor={'gray'}
                    style={searchInput}
                />
                <TouchableOpacity onPress={() => navigation.goBack()} style={cancel}>
                    <XMarkIcon size='25' color='white' />
                </TouchableOpacity>
            </View>
            {
                loading ? (
                    <Loading />
                ) : (
                    results.length>0 ? (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{paddingHorizontal: 15, paddingVertical: 5}}
                        >
                            <Text style={{color: 'white', fontWeight: 'bold', marginLeft: 5}}>Results ({results.length})</Text>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                flexWrap: 'wrap'
                            }}>
                                {
                                    results.map((item, index) => {
                                        return(
                                            <TouchableWithoutFeedback
                                                key={index}
                                                onPress={() => navigation.push('Movie', item)}
                                            >
                                                <View style={{marginVertical: 5}}>
                                                    <Image
                                                        style={{borderRadius: 10, width: width*0.44, height: height*0.3}}
                                                        source={require('../assets/barbie.jpg')}
                                                    />
                                                    <Text style={{color: 'white', marginLeft: 5, marginTop: 5, color: 'lightgray'}}>
                                                        {movieName.length>22 ? movieName.slice(0,22)+'...' : movieName}
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                    ) : (
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Image 
                                style={{width: 200, height: 200}}
                                source={require('../assets/movietime.png')}
                            />
                        </View>
                    )
                )
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    searchArea: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        borderRadius: 50,
        borderColor: 'gray',
        borderWidth: 1
    },
    searchInput: {
        flex: 1,
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: 1,
        margin: 5
    },
    cancel: {
        borderRadius: 50,
        backgroundColor: 'gray',
        padding: 5
    }
})

export default SearchScreen