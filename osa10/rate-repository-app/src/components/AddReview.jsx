import Text from './Text';
import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup'
import createReview from '../hooks/createReview';
import { useMutation } from '@apollo/client/react';
import { CREATE_REVIEW } from '../graphql/mutations';
import useReviews from '../hooks/useReviews';
import { useNavigate } from 'react-router-native';


const reviewSchema = yup.object().shape({
        ownerName: yup
            .string()
            .required('Repository owner name is required'),
        repositoryName: yup
            .string()
            .required('Repository name is required'),
        rating: yup
            .string()
            .required('Rating is required'),
        review: yup
            .string()
        
})

const styles = StyleSheet.create({
  textInput: {
    borderColor: 
    '#000',
    borderWidth: 1,
  },
  errorInput: {
    borderColor: 
    '#d73a4a',
    borderWidth: 1,
  }
});

export const ReviewContainer = ({ onSubmit }) => {

        const formik = useFormik({
        initialValues: {
            ownerName: '',
            repositoryName: '',
            rating: '',
            text: ''
        },
        validationSchema: reviewSchema,
        onSubmit: (values) => onSubmit(values)
    })

    return (

        <View style={{ padding: 10}}>
            <TextInput
                style={(formik.touched.ownerName && formik.errors.ownerName)? styles.errorInput : styles.textInput}
                placeholder='Repository owner name'
                value={formik.values.ownerName}
                onChangeText={formik.handleChange('ownerName')}
            />
            {formik.touched.ownerName && formik.errors.ownerName &&(
                <Text color='error'>{formik.errors.ownerName}</Text>
            )}
            <TextInput
                style={(formik.touched.repositoryName && formik.errors.repositoryName)? styles.errorInput : styles.textInput}
                placeholder='Repository name'
                value={formik.values.repositoryName}
                onChangeText={formik.handleChange('repositoryName')}
            />
            {formik.touched.repositoryName && formik.errors.repositoryName &&(
                <Text color='error'>{formik.errors.repositoryName}</Text>
            )}
            <TextInput
                style={(formik.touched.rating&& formik.errors.rating)? styles.errorInput : styles.textInput}
                keyboardType='numeric'
                placeholder='Rating between 0 and 100'
                value={formik.values.rating}
                onChangeText={formik.handleChange('rating')}
            />
            {formik.touched.rating && formik.errors.rating &&(
                <Text color='error'>{formik.errors.rating}</Text>
            )}
            <TextInput
                style={styles.textInput}
                placeholder='Review'
                value={formik.values.text}
                onChangeText={formik.handleChange('text')}
                multiline
            />
            <Pressable style={{ padding: 5}} onPress={formik.handleSubmit}>
                <Text color="colorLanguage" fontSize="subheading">Create a review</Text>
            </Pressable>  
        </View>

        
    )

}

const AddReview = () => {

    const [review] = createReview()
    const navigate = useNavigate()


    const handleSubmit = async (values) => {


        const reviewToAdd = { review: {
            "rating": Number(values.rating),
            "ownerName": values.ownerName,
            "repositoryName": values.repositoryName,
            "text": values.text
            
        }}

        try {
            const { data } = await review(reviewToAdd)
            navigate(`/${data.createReview.repository.id}`)

        } catch (error) {
            console.log(error)
        } 
    }

    return <ReviewContainer onSubmit={handleSubmit} />


};

export default AddReview;