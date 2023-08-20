import React from "react"
import { StyleSheet, View, SafeAreaView, Dimensions, TextInput, TouchableOpacity } from "react-native"
import { XMarkIcon } from "react-native-heroicons/outline"
import { useNavigation } from "@react-navigation/native"

var {width, height} = Dimensions.get('window')

const SearchScreen = () => {
    const navigation = useNavigation()

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
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})

export default SearchScreen