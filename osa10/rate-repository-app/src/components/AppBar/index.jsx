import { View, StyleSheet, Pressable } from 'react-native';
import { Link } from 'react-router-native'
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import { ScrollView } from 'react-native';
import useAuthStorage from '../../hooks/useAuthStorage';
import { useApolloClient, useQuery } from '@apollo/client/react';
import { USER } from '../../graphql/queries';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    height: 50,
    backgroundColor: "#24292e",
    // ...
  },
  text: {
    margin: 15,
    color: "white"
  }
  // ...
});

const AppBar = () => {

  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient();

  const userQuery = useQuery(USER);

  if (userQuery.loading) return <Text>Loading...</Text>

  const handleSignOut = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  }

  return (
    <View style={styles.container}>
        <ScrollView horizontal>
          <Link to="/">
            <AppBarTab name={"Repositories"} />
          </Link>        
          {userQuery.data.me
          ?
          <>
          <Link to="/review">
            <AppBarTab name={"Create a review"} />
          </Link>
          <Link to="/myreviews">
            <AppBarTab name={"My reviews"} />
          </Link>
          <Link to="/">
            <Pressable onPress={handleSignOut}>
              <AppBarTab name={"Sign-out"}  />
            </Pressable>     
          </Link>
          </>
      
          :
          <>
          <Link to="/signin">
            <AppBarTab name={"Sign-in"} />
          </Link>
          <Link to="/signup">
            <AppBarTab name={"Sign-up"} />
          </Link>
          </>
          }    
        </ScrollView>   
    </View>
  )
  
  
};

export default AppBar;