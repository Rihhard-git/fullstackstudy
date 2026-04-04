import Text from '../Text';
import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup'
import useSignIn from '../../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const signInSchema = yup.object().shape({
        username: yup
            .string()
            .required('Username is required'),
        password: yup
            .string()
            .required('Password is required')
        
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

export const SignInContainer = ({ onSubmit }) => {

        const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: signInSchema,
        onSubmit: (values) => onSubmit(values)
    })

    return (

        <View style={{ padding: 10}}>
            <TextInput
                style={(formik.touched.username && formik.errors.username)? styles.errorInput : styles.textInput}
                placeholder='Username'
                value={formik.values.username}
                onChangeText={formik.handleChange('username')}
            />
            {formik.touched.username && formik.errors.username &&(
                <Text color='error'>{formik.errors.username}</Text>
            )}
            <TextInput
                style={(formik.touched.password && formik.errors.password)? styles.errorInput : styles.textInput}
                placeholder='Password'
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                secureTextEntry={true}
            />
            {formik.touched.password && formik.errors.password &&(
                <Text color='error'>{formik.errors.password}</Text>
            )}
            <Pressable style={{ padding: 5}} onPress={formik.handleSubmit}>
                <Text color="colorLanguage" fontSize="subheading">Sign in</Text>
            </Pressable>  
        </View>

        
    )

}

const SignIn = () => {

    const [signIn] = useSignIn()
    const navigate = useNavigate()


    const handleSubmit = async (values) => {
        const { username, password } = values

        try { 
            const { data } = await signIn({ username, password });
            navigate('/')

        } catch (e) {
            console.log(e)
        }
    }

    return <SignInContainer onSubmit={handleSubmit} />


};

export default SignIn;