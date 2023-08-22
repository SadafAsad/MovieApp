import React, { useState, useEffect} from "react"
import { StyleSheet, View, Text, TouchableOpacity, TextInput, SafeAreaView, Dimensions, Pressable } from "react-native"
import { ChevronLeftIcon, EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline"
import { useNavigation } from "@react-navigation/native"
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { UseTogglePasswordVisibility } from '../components/TogglePasswordVisibility'
import { loginUser } from "../api/firebasedb"

var {width, height} = Dimensions.get('window')
const ios = Platform.OS == 'ios'
const topMargin = ios ? 0 : 3

const LoginScreen = () => {
    const { container, logo, mDesign, input, inputArea, signup, container2, backButton, safeArea, container1, loginInputArea } = styles

    const [email, onEmailChanged] = useState('');
    const [password, onPasswordChanged] = useState('');
    const [error, onErrorChanged] = useState('');
    const [hasError, onHasErrorChanged] = useState(false);
    const { passwordVisibility, rightIcon, handlePasswordVisibility } = UseTogglePasswordVisibility();

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
                                    const result = await loginUser(email, password)
                                    if (result.e) {
                                        onHasErrorChanged(true)
                                        onErrorChanged(result.data)
                                        onEmailChanged('')
                                        onPasswordChanged('')
                                    }
                                    else navigation.navigate('Profile')
                                }}
                            >
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
    }
})

export default LoginScreen