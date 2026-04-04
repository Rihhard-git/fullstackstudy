import { Image, Linking, Pressable, StyleSheet, View } from "react-native"
import Text from "../Text"
import useGetRepositoryById from "../../hooks/useGetRepoById";
import { useParams } from "react-router-native";

const styles = StyleSheet.create({
    flexContainerA: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-evenly",
        padding: 5,
        gap: "5px",
        backgroundColor: "white",


    },
    flexContainerB: {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
    },
    flexItemA: {
        flexGrow: 0,
        /* padding: 10 */
    },
    flexItemB: {
        flexGrow: 1,
       /*  padding: 10 */
    }

})

const RepositoryItem = ({item , openSingle}) => {

    let repository = item

    if (openSingle) {

        const id = useParams()
        const { data, loading } = useGetRepositoryById(id.id)
        if (loading) return <Text>Loading repository data...</Text>
    
        repository = data.repository
    }

    return (

        <View testID="repositoryItem">
            <View style={styles.flexContainerA}>
                <View style={styles.flexItemA}>
                    <Image style={{width: 50, height: 50}} source={{uri: repository.ownerAvatarUrl}}/>
                </View>
                <View style={styles.flexItemB}>
                    <View style={styles.flexContainerB}>
                        <Text fontWeight="bold">{repository.fullName}</Text>
                        <Text color="textSecondary">{repository.description}</Text>
                        <Text color="colorLanguage">{repository.language}</Text>
                    </View>            
                </View>      
            </View>

            <View style={styles.flexContainerA}>
                <View style={styles.flexContainerB}>
                    <View style={styles.flexItemB}>
                        <Text fontWeight="bold">{repository.stargazersCount > 1000 ? `${(repository.stargazersCount/1000).toFixed(1)}k` : repository.stargazersCount}</Text>
                    </View>
                    <View style={styles.flexItemB}>
                        <Text color="textSecondary">Stars</Text>
                    </View>
                        
                </View>
                <View style={styles.flexContainerB}>
                    <View style={styles.flexItemB}>
                        <Text fontWeight="bold">{repository.forksCount > 1000 ? `${(repository.forksCount/1000).toFixed(1)}k` : repository.forksCount}</Text>
                    </View>
                    <View style={styles.flexItemB}>
                        <Text color="textSecondary">Forks</Text>
                    </View>
                </View>
                <View style={styles.flexContainerB}>
                    <View style={styles.flexItemB}>
                        <Text fontWeight="bold">{repository.reviewCount > 1000 ? `${(repository.reviewCount/1000).toFixed(1)}k` : repository.reviewCount}</Text>
                    </View>
                    <View style={styles.flexItemB}>
                        <Text color="textSecondary">Reviews</Text>
                    </View>
                </View>
                <View style={styles.flexContainerB}>
                    <View style={styles.flexItemB}>
                        <Text fontWeight="bold">{repository.ratingAverage > 1000 ? `${(repository.ratingAverage/1000).toFixed(1)}k` : repository.ratingAverage}</Text>
                    </View>
                    <View style={styles.flexItemB}>
                        <Text color="textSecondary">Rating</Text>
                    </View>
                </View>
            </View>
            <View style={styles.flexContainerA}>
                {openSingle && 
            <Pressable style={{ padding: 5}} onPress={() => Linking.openURL(repository.url)}>
                <Text color="colorLanguage" fontSize="subheading">Open in GitHub</Text>
            </Pressable>
            }
                </View>    
             
        </View>
         
    )
}
export default RepositoryItem