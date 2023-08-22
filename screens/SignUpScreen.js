import React, { useState } from "react"
import { StyleSheet, View, Text, TouchableOpacity, TextInput, SafeAreaView, Dimensions } from "react-native"
import { ChevronLeftIcon, EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline"
import { useNavigation } from "@react-navigation/native"
import { UseTogglePasswordVisibility } from '../components/TogglePasswordVisibility'
import { createUser } from "../api/firebasedb"

var {width, height} = Dimensions.get('window')
const ios = Platform.OS == 'ios'
const topMargin = ios ? 0 : 3

const SignUpScreen = () => {
    const { container, logo, mDesign, input, inputArea, signup, container2, backButton, safeArea, container1, loginInputArea } = styles

    const [username, onUsernameChanged] = useState('')
    const [email, onEmailChanged] = useState('')
    const [password, onPasswordChanged] = useState('')
    const [error, onErrorChanged] = useState('')
    const [hasError, onHasErrorChanged] = useState(false)
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = UseTogglePasswordVisibility()

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
                                autoCapitalize="none"
                                onChangeText={onUsernameChanged}
                                value={username}
                            />
                        </View>
                        <View style={inputArea}>
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor={'gray'}
                                style={input}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={onEmailChanged}
                                value={email}
                            />
                        </View>
                        <View style={inputArea}>
                            <TextInput
                                placeholder="Password"
                                placeholderTextColor={'gray'}
                                style={input}
                                keyboardType="default"
                                autoCapitalize="none"
                                autoCorrect={false}
                                secureTextEntry={passwordVisibility}
                                onChangeText={onPasswordChanged}
                                value={password}
                            />
                            <TouchableOpacity onPress={handlePasswordVisibility}>
                                {
                                    rightIcon=='eye' ? 
                                    <EyeIcon name={rightIcon} size={30} color="gray" />
                                    :
                                    <EyeSlashIcon name={rightIcon} size={30} color="gray" />
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={loginInputArea}>
                            <TouchableOpacity 
                                onPress={async () => {
                                    onHasErrorChanged(false)
                                    onErrorChanged('')
                                    const result = await createUser(username, email, password)
                                    if (result.e) {
                                        onHasErrorChanged(true)
                                        onErrorChanged(result.data)
                                        onEmailChanged('')
                                        onPasswordChanged('')
                                        onUsernameChanged('')
                                    }
                                    else navigation.navigate('Profile')
                                }}
                            >
                                <Text style={{color: '#262626', fontWeight: 'bold', alignSelf: 'center', fontSize: 16}}>SIGN UP</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{marginTop: 20}}>
                            <Text style={signup}>Already have an account? Log In</Text>
                        </TouchableOpacity>
                        { hasError && <Text style={{color: 'red', margin: 30}}>{error}</Text> }
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

export default SignUpScreen