import React from "react"
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from "react-native"
import { fallBackPersonImage, image185 } from "../api/moviedb"

const Cast = ({ cast, navigation }) => {
    let personName = 'Margo Robbie'
    let characterName = 'Barbie'

    return (
        <View>
            <Text style={{color: 'white', fontSize: 16, marginLeft: 5, marginBottom: 15, marginTop: 10}}>Top Cast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 15}}
            >
                {
                    cast && cast.map((person, index) => {
                        return (
                            <TouchableOpacity
                                Key={index}
                                style={{marginRight: 5, alignItems: 'center'}}
                                onPress={() => navigation.navigate('Person', person)}
                            >
                                <View
                                    style={{
                                        overflow: 'hidden',
                                        borderRadius: 35,
                                        height: 70,
                                        width: 70
                                    }}
                                >
                                    <Image
                                        // source={require('../assets/margo.jpeg')}
                                        source={{uri: image185(person?.profile_path) || fallBackPersonImage}}
                                        style={{height: '100%', width: '100%', borderRadius: 50, borderWidth: 1, borderColor: '#ccc'}}
                                    />
                                </View>
                                <Text style={{color: 'white', marginTop: 5, fontSize: 10}}>
                                    {person?.character.length>10 ? person?.character.slice(0,10)+'...' : person?.character}
                                </Text>
                                <Text style={{color: 'gray', marginTop: 2, fontSize: 10}}>
                                    {person?.original_name.length>10 ? person?.original_name.slice(0,10)+'...' : person?.original_name}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default Cast