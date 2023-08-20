import React, { useState } from "react"
import { StyleSheet, View, Text, Dimensions, ScrollView, SafeAreaView, TouchableOpacity, Image } from "react-native"
import { ChevronLeftIcon } from "react-native-heroicons/outline"
import { HeartIcon } from "react-native-heroicons/solid"
import { useNavigation } from "@react-navigation/native"
import MovieList from "../components/MovieList"
import Loading from "../components/Loading"

var {width, height} = Dimensions.get('window')
const ios = Platform.OS == 'ios'
const verticalMargin = ios ? 0 : 3

const PersonScreen = () => {
    const [isFavourite, toggleFavourite] = useState(false)
    const navigation = useNavigation()
    const [personMovies, setPersonMovies] = useState([1, 2, 3, 4])
    const [loading, setLoading] = useState(false)

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
            {
                loading ? (
                    <Loading />
                ) : (
                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                shadowColor: 'gray',
                                shadowRadius: 40,
                                shadowOffset: {width: 0, height: 5},
                                shadowOpacity: 1
                            }}
                        >
                            <View style={{
                                alignItems: 'center',
                                borderRadius: '100%',
                                overflow: 'hidden'
                            }}>
                                <Image
                                    source={require('../assets/margo.jpeg')}
                                    style={{height: height*0.43, width: width*0.74}}
                                />
                            </View>
                        </View>
                        <View style={{marginTop: 6}}>
                            <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold', alignSelf: 'center'}}>
                                Margo Robbie
                            </Text>
                            <Text style={{fontSize: 16, color: '#717573', fontWeight: 'bold', alignSelf: 'center', margin: 4}}>
                                London, United Kingdom
                            </Text>
                        </View>
                        <View 
                            style={{
                                marginHorizontal: 3, 
                                marginTop: 6, 
                                flexDirection: 'row', 
                                justifyContent: 'space-between', 
                                alignItems: 'center',
                                backgroundColor: '#959c99',
                                borderRadius: '100%',
                                padding: 4
                            }}>
                            <View style={{borderRightWidth: 2, paddingHorizontal: 2, alignItems: 'center', borderColor: '#717573'}}>
                                <Text style={{color: 'white', fontWeight: 'bold'}}>Gender</Text>
                                <Text style={{color: '#717573', fontSize: 15}}>Male</Text>
                            </View>
                            <View style={{borderRightWidth: 2, paddingHorizontal: 2, alignItems: 'center', borderColor: '#717573'}}>
                                <Text style={{color: 'white', fontWeight: 'bold'}}>Birthday</Text>
                                <Text style={{color: '#717573', fontSize: 15}}>1964-09-09</Text>
                            </View>
                            <View style={{borderRightWidth: 2, paddingHorizontal: 2, alignItems: 'center', borderColor: '#717573'}}>
                                <Text style={{color: 'white', fontWeight: 'bold'}}>Known for</Text>
                                <Text style={{color: '#717573', fontSize: 15}}>Acting</Text>
                            </View>
                            <View style={{paddingHorizontal: 2, alignItems: 'center', borderColor: '#717573'}}>
                                <Text style={{color: 'white', fontWeight: 'bold'}}>Popularity</Text>
                                <Text style={{color: '#717573', fontSize: 15}}>64.62</Text>
                            </View>
                        </View>
                        <View style={{marginVertical: 6, marginHorizontal: 4}}>
                            <Text style={{color: 'white', fontSize: 20}}>Biography</Text>
                            <Text style={{color: '#717573', letterSpacing: 1}}>Margot Elise Robbie is an Australian actress and producer. Known for her work in both blockbuster and independent films, she has received various accolades, including nominations for two Academy Awards, four Golden Globe Awards, and five British Academy Film Awards.</Text>
                        </View>
                        <MovieList title={'Movies'} data={personMovies} hideSeeAll={true} />
                    </View>
                )
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({

})

export default PersonScreen