import React from "react"
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from "react-native"

const Cast = ({ cast, navigation }) => {
    let personName = 'Margo Robbie'
    let characterName = 'Barbie'

    return (
        <View style={{}}>
            <Text style={{color: 'white', fontSize: 16, marginLeft: 5, marginBottom: 5}}>Top Cast</Text>
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
                                style={{marginRight: 5, alignSelf: 'center'}}
                                onPress={() => navigation.navigate('Person', person)}
                            >
                                <View
                                    style={{
                                        overflow: 'hidden',
                                        borderRadius: 35,
                                        height: 70,
                                        width: 70,
                                        alignSelf: 'center'
                                    }}
                                >
                                    <Image
                                        source={require('../assets/margo.jpeg')}
                                        style={{height: '100%', width: '100%'}}
                                    />
                                </View>
                                <Text style={{color: 'white', marginTop: 5, fontSize: 10}}>
                                    {characterName.length>10 ? characterName.slice(0,10)+'...' : characterName}
                                </Text>
                                <Text style={{color: 'gray', marginTop: 2, fontSize: 10}}>
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