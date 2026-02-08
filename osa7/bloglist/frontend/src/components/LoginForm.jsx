import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logIn } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const LoginForm = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        dispatch(logIn({ username: username, password: password }))
        navigate('/')
    }


    return (

        <Box
            component="form"
            noValidate
            autoComplete="off">
            <Typography variant='h5' sx={{ p: 2 }}>Login</Typography>
            <div>
                <TextField
                    label="Username"
                    id="username"
                    size="small"
                    sx={{ p: 1 }}
                    onChange={( { target }) => setUsername(target.value)}
                />
                <TextField
                    label="Password"
                    type='password'
                    id="password"
                    size="small"
                    sx={{ p: 1 }}
                    onChange={( { target }) => setPassword(target.value)}
                />
                <Button variant='contained' onClick={handleLogin}>Login</Button>
            </div>

        </Box>

    /* <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>
                        username
                        <input
                            type="text"
                            value={username}
                            onChange={( { target }) => setUsername(target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        password
                        <input
                            type="password"
                            value={password}
                            onChange={( { target }) => setPassword(target.value)}
                        />
                    </label>
                </div>
                <button type="submit">login</button>
            </form>
        </div> */
    )

}

export default LoginForm