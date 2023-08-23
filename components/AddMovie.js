import React, { useEffect, useState } from "react"
import { StyleSheet, View, Image, Text, ScrollView, Dimensions } from "react-native"
import { useRoute } from "@react-navigation/native"
import { HeartIcon } from "react-native-heroicons/solid"
import { PlusIcon, ClockIcon } from "react-native-heroicons/outline"
import { fetchTrendingMovies, image185 } from "../api/moviedb"

var {width, height} = Dimensions.get('window')

const AddMovie = () => {
    const { container, poster, name, movieContainer } = styles

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
            contentContainerStyle={{paddingVertical: 15}}
        >
            {
                trending.map((item, index) => {
                    return (
                        <View style={container}>
                            <View style={movieContainer}>
                                <Image
                                    source={{uri: image185(item?.poster_path) || fallBackMoviePoster}}
                                    style={poster}
                                />
                                <Text style={name}>{item?.title?.length>22 ? item?.title?.slice(0,22)+'...' : item?.title}</Text>
                            </View>
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
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 4
    },
    poster: {
        width: width*0.15,
        height: height*0.1
    },
    name: {
        color: 'white',
        margin: 10,
        fontWeight: 'bold'
    },
    movieContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default AddMovie