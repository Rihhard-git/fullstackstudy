import Text from './Text';
import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup'
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const signUpSchema = yup.object().shape({
        username: yup
            .string()
            .required('Username is required')
            .min(5, 'Username must be longer than 4 characters')
            .max(30, 'Username cant be longer than 30 characters'),
        password: yup
            .string()
            .required('Password is required'),
        passwordConfirm: yup
            .string()
            .required('Password confirm is required')
            .oneOf([yup.ref('password'), null], 'Passwords are not identical')
        
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

export const SignUpContainer = ({ onSubmit }) => {

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            passwordConfirm: ''
        },
        validationSchema: signUpSchema,
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
            <TextInput
                style={(formik.touched.passwordConfirm && formik.errors.passwordConfirm)? styles.errorInput : styles.textInput}
                placeholder='Password confirm'
                value={formik.values.passwordConfirm}
                onChangeText={formik.handleChange('passwordConfirm')}
                secureTextEntry={true}
            />
            {formik.touched.passwordConfirm && formik.errors.passwordConfirm &&(
                <Text color='error'>{formik.errors.passwordConfirm}</Text>
            )}
            <Pressable style={{ padding: 5}} onPress={formik.handleSubmit}>
                <Text color="colorLanguage" fontSize="subheading">Sign in</Text>
            </Pressable>  
        </View>
    )

}

const SignUp = () => {

    const [signUp] = useSignUp()
    const [signIn] = useSignIn()
    const navigate = useNavigate()

    const handleSubmit = async (values) => {

        const user = {
            user: {
                username: values.username,
                password: values.password 
            }    
        }

        console.log(user)

        try { 
            const { data } = await signUp(user);
            console.log(data)
            await signIn(user.user)
            navigate('/')

        } catch (e) {
            console.log(e)
        }

        
    }

    return <SignUpContainer onSubmit={handleSubmit} />

}

export default SignUp