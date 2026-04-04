import { useParams } from "react-router-native";
import useReviews from "../hooks/useReviews";
import RepositoryItem from "./RepositoryList/RepositoryItem";
import { FlatList, StyleSheet, View } from "react-native";
import Text from "./Text";
import { format } from 'date-fns'

const styles = StyleSheet.create({
    flexContainerA: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "flex-start",
        backgroundColor: "white",


    },
    flexContainerB: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "flex-end",
        gap: '5px',
    },
    flexItemA: {
        flexGrow: 0,
        borderStyle: 'solid',
        borderColor: 'blue',
        borderWidth: 2,
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        padding: 5
    },
    flexItemB: {
        flexGrow: 3,
        padding: 2,
    },
    separator: {
    height: 10,
  },

})

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = () => {

    return (
        <RepositoryItem openSingle={true} />
    )

};

const ReviewItem = ({ review }) => {

    console.log(typeof(review.rating))

    return (
        <View>
            <View style={styles.flexContainerA}>
                <View style={styles.flexItemA}>
                    <Text fontWeight="bold" color="primary" textAlign="center">{review.rating}</Text>
                </View>    
                <View styles={styles.flexItemB}>
                    <Text fontWeight="bold">{review.user.username}</Text>
                    <Text color="textSecondary">{format((review.createdAt), 'dd.mm.yyyy')}</Text>
                </View>
            </View>  
            <View style={styles.flexContainerA}>
                <View style={styles.flexItemB}>
                    <Text>{review.text}</Text>
                </View>
            </View>
        </View>
        
        
    )
};

const SingleRepository = () => {

    const {id} = useParams()
    const {data, loading} = useReviews(id)

    if (loading) return <Text>Loading data...</Text>

    const reviewNodes = data.repository.reviews
    ? data.repository.reviews.edges.map(edge => edge.node)
    : []

  return (

    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo/>}
      // ...
    />
  );
};

export default SingleRepository;