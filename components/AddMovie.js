import React, { useEffect, useState } from "react"
import { StyleSheet, View, Image, Text, ScrollView, Dimensions } from "react-native"
import { useRoute } from "@react-navigation/native"
import { HeartIcon } from "react-native-heroicons/solid"
import { PlusIcon, ClockIcon } from "react-native-heroicons/outline"
import { fetchTrendingMovies, image185 } from "../api/moviedb"

var {width, height} = Dimensions.get('window')

const AddMovie = () => {
    const { container, poster, name } = styles

    const [trending, setTrending] = useState([])
    const [loading, setLoading] = useState(true)

    const {params: item} = useRoute()

    useEffect(() => {
        getTrendingMovies()
    }, [])

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies()
        if (data && data.results) setTrending(data.results)
        setLoading(false)
    }

    return (
        <ScrollView
            vertical
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{}}
        >
            {
                trending.map((item, index) => {
                    return (
                        <View style={container}>
                            <Image
                                source={{uri: image185(item?.poster_path) || fallBackMoviePoster}}
                                style={poster}
                            />
                            <Text style={name}>{item?.title?.length>14 ? item?.title?.slice(0,14)+'...' : item?.title}</Text>
                            <HeartIcon size='35' color={'white'} />
                        </View>
                    )
                })
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    poster: {
        width: width*0.5,
        height: height*0.3
    },
    name: {
        color: 'white'
    }
})

export default AddMovie