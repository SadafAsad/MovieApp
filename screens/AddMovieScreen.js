import React, { useCallback, useState } from "react"
import { StyleSheet, View, SafeAreaView, Dimensions, TextInput, TouchableOpacity, ScrollView, Text, TouchableWithoutFeedback, Image } from "react-native"
import { XMarkIcon } from "react-native-heroicons/outline"
import { useNavigation, useRoute } from "@react-navigation/native"
import Loading from "../components/Loading"
import { debounce } from 'lodash'
import { fallBackMoviePoster, image185, searchMovie } from "../api/moviedb"
import AddMovie from "../components/AddMovie"

var {width, height} = Dimensions.get('window')

const AddMovieScreen = () => {
    const { searchArea, searchInput, cancel } = styles

    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    
    const navigation = useNavigation()
    const {params: item} = useRoute()
    
    const handleSearch = value => {
        if (value && value.length>2){
            setLoading(true)
            searchMovie({
                query: value,
                include_adult: 'false',
                language: 'en-US',
                page: '1'
            }).then(data => {
                setLoading(false)
                if (data && data.results) setResults(data.results)
            })
        } else {
            setLoading(false)
            setResults([])
        }
    }
    const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#262626'}}>
            <View style={searchArea}>
                <TextInput
                    onChangeText={handleTextDebounce}
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
                                                        // source={require('../assets/barbie.jpg')}
                                                        source={{uri: image185(item?.poster_path) || fallBackMoviePoster}}
                                                    />
                                                    <Text style={{color: 'white', marginLeft: 5, marginTop: 5, color: 'lightgray'}}>
                                                        {item?.title.length>22 ? item?.title.slice(0,22)+'...' : item?.title}
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                    ) : (
                        <AddMovie />
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

export default AddMovieScreen