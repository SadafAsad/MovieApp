import React from "react"
import { StyleSheet, View, Text, TouchableOpacity, TextInput, SafeAreaView, Dimensions } from "react-native"
import { ChevronLeftIcon } from "react-native-heroicons/outline"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from '@expo/vector-icons';

var {width, height} = Dimensions.get('window')
const ios = Platform.OS == 'ios'
const topMargin = ios ? 0 : 3

const LoginScreen = () => {
    const { container, logo, mDesign, input, inputArea, signup, container2, backButton, safeArea, container1, loginInputArea } = styles

    const navigation = useNavigation()

    return (
        <View style={container}>
            <View style={{width: width}}>
                {/* <SafeAreaView style={safeArea}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={backButton}
                    >
                        <ChevronLeftIcon size='28' strokeWidth={2.5} color='white' />
                    </TouchableOpacity>
                </SafeAreaView> */}
                <View style={container1}>
                    <Text style={logo}><Text style={mDesign}>M</Text>ovies</Text>
                    <View style={container2}>
                        <View style={inputArea}>
                            <TextInput
                                placeholder="Username"
                                placeholderTextColor={'gray'}
                                style={input}
                            />
                        </View>
                        <View style={inputArea}>
                            <TextInput
                                placeholder="Password"
                                placeholderTextColor={'gray'}
                                style={input}
                            />
                        </View>
                        <View style={loginInputArea}>
                            <TouchableOpacity onPress={() => {}}>
                                <Text style={{color: '#262626', fontWeight: 'bold', alignSelf: 'center', fontSize: 16}}>LOG IN</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{marginTop: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Ionicons name="arrow-back-circle-outline" size={20} color="#eab308" />
                            <Text style={[signup, {marginLeft: 5}]}>Continue without logging in</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={{marginTop: 20}}>
                            <Text style={signup}>Don't have an account? Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#262626'
    },
    container1: {
        marginTop: 100
    },
    logo: {
        color: 'white',
        fontSize: 50,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    mDesign: {
        color: '#eab308'
    },
    inputArea: {
        margin: 5,
        padding: 13,
        borderRadius: 50,
        borderColor: 'gray',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignSelf: 'stretch'
    },
    input: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: 1,
        margin: 5
    },
    signup: {
        color: '#eab308',
        fontSize: 15
    },
    container2: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center'
    },
    backButton: {
        borderRadius: 10, 
        padding: 1, 
        backgroundColor: '#eab308',
        marginLeft: 5
    },
    safeArea: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 4,
        marginTop: {topMargin}
    },
    loginInputArea: {
        margin: 5,
        padding: 15,
        borderRadius: 50,
        borderColor: 'gray',
        borderWidth: 1,
        alignContent: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#eab308'
    },
})

export default LoginScreen