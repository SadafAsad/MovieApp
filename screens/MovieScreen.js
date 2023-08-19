import React, { useEffect } from "react"
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity } from "react-native"
import { useRoute } from "@react-navigation/native"
import { ChevronLeftIcon } from "react-native-heroicons/outline"

const MovieScreen = () => {
    const {params: item} = useRoute()

    useEffect(() => {

    }, [item])

    return (
        <ScrollView
            contentContainerStyle={{paddingBottom: 20}}
            style={{flex: 1, backgroundColor: '#262626'}}
        >
            <View>
                <SafeAreaView
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: 4
                    }}
                >
                    <TouchableOpacity
                        style={{borderRadius: 10, padding: 1, backgroundColor: '#eab308'}}
                    >
                        <ChevronLeftIcon size='28' strokeWidth={2.5} color='white' />
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

})

export default MovieScreen