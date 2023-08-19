import React from "react"
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from "react-native"

const Cast = ({ cast, navigation }) => {
    let personName = 'Margo Robbie'
    let characterName = 'Barbie'

    return (
        <View style={{marginVertical: 6}}>
            <Text style={{color: 'white', fontSize: 16, marginHorizontal: 4, marginBottom: 5}}>Top Cast</Text>
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
                                style={{marginRight: 4, alignSelf: 'center'}}
                                onPress={() => navigation.navigate('Person', person)}
                            >
                                <View
                                    style={{
                                        overflow: 'hidden',
                                        borderRadius: '100%',
                                        height: 50,
                                        width: 50,
                                        alignSelf: 'center'
                                    }}
                                >
                                    <Image
                                        source={require('../assets/margo.jpeg')}
                                        style={{
                                            borderRadius: 10,
                                            height: 54,
                                            width: 50 
                                        }}
                                    />
                                </View>
                                <Text style={{color: 'white', marginTop: 1, fontSize: 10}}>
                                    {characterName.length>10 ? characterName.slice(0,10)+'...' : characterName}
                                </Text>
                                <Text style={{color: '#717573', marginTop: 1, fontSize: 10}}>
                                    {personName.length>10 ? personName.slice(0,10)+'...' : personName}
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