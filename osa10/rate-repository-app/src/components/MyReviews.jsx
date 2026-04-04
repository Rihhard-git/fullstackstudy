import { FlatList, StyleSheet, View } from "react-native";
import Text from "./Text";
import { format } from 'date-fns'
import { useQuery } from "@apollo/client/react";
import { USER } from "../graphql/queries";
import { Button } from "react-native-paper";

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

const ReviewItem = ({ review }) => {

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
            <View>
                <Button 
                    onPress={() => console.log('button pressed')}
                    title="Delete"
                />
            </View>
        </View>             
    )
};

const MyReviews = () => {

    const userQuery = useQuery(USER, {
        variables: {
            includeReviews: true
        }
    });

    if (userQuery.loading) return <Text>loading...</Text>

    const reviewNodes = userQuery.data.me.reviews
    ? userQuery.data.me.reviews.edges.map(edge => edge.node)
    : []

    return (

        <FlatList
              data={reviewNodes}
              ItemSeparatorComponent={ItemSeparator}
              renderItem={({ item }) => <ReviewItem review={item}/>}
              keyExtractor={({ id }) => id}
              // ...
            />

    )
}

export default MyReviews