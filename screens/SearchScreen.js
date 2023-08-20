import React, { useState } from "react"
import { StyleSheet, View, SafeAreaView, Dimensions, TextInput, TouchableOpacity, ScrollView, Text, TouchableWithoutFeedback, Image } from "react-native"
import { XMarkIcon } from "react-native-heroicons/outline"
import { useNavigation } from "@react-navigation/native"

var {width, height} = Dimensions.get('window')

const SearchScreen = () => {
    const navigation = useNavigation()
    const [results, setResults] = useState([1, 2, 3, 4])
    let movieName = 'Barbie'

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#262626'}}>
            <View style={{
                marginHorizontal: 4,
                marginBottom: 3,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
                borderRadius: '100%',
                borderColor: '#717573',
                borderWidth: 1
            }}>
                <TextInput
                    placeholder="Search Movie"
                    placeholderTextColor={'lightgray'}
                    style={{
                        paddingBottom: 1,
                        paddingLeft: 6,
                        flex: 1,
                        fontWeight: 'bold',
                        color: 'white',
                        letterSpacing: 1
                    }}
                />
                <TouchableOpacity onPress={() => navigation.goBack()}
                    style={{
                        borderRadius: '100%',
                        padding: 3,
                        margin: 1,
                        backgroundColor: '#717573'
                    }}
                >
                    <XMarkIcon size='25' color='white' />
                </TouchableOpacity>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 15}}
                style={{marginBottom: 3}}
            >
                <Text style={{color: 'white', fontWeight: 'bold', marginLeft: 1}}>Results ({results.length})</Text>
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
                                    <View style={{marginBottom: 4, marginVertical: 2}}>
                                        <Image
                                            style={{borderRadius: 10, width: width*0.44, height: height*0.3}}
                                            source={require('../assets/barbie.jpg')}
                                        />
                                        <Text style={{color: 'white', marginLeft: 1}}>
                                            {movieName.length>22 ? movieName.slice(0,22)+'...' : movieName}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})

export default SearchScreen