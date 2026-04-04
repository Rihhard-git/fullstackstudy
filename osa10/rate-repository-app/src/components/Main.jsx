import { StyleSheet, View, Text } from 'react-native';
import { Route, Routes, Navigate, useParams } from 'react-router-native'

import RepositoryList from '../components/RepositoryList';
import SignIn from '../components/SignIn';
import AppBar from '../components/AppBar';
import theme from '../theme'
import SingleRepository from './SingleRepository';
import AddReview from './AddReview';
import SignUp from './SignUp';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground
  },
});

const Main = () => {

  return (
    
    <View style={styles.container}>
        <AppBar/>
        <Routes>
          <Route path="/" element={<RepositoryList />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/myreviews" element={<MyReviews />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/:id" element={<SingleRepository/>} />
          <Route path="/review" element={<AddReview />} />
        </Routes>
        
    </View>
  );
};

export default Main;