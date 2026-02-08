import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Card'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import blogService from './services/blogs'
import userService from './services/users'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { showNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'
import UsersList from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Blogs from './components/BlogList'

const App = () => {

    const dispatch = useDispatch()
    const loggedUser = useSelector(state => state.user)
    const [users, setUsers] = useState([])
    const blogs = useSelector(state => state.blogs)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(initializeBlogs())
        const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
        userService.getAll().then(users => {
            setUsers(users)
        })
        if(loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
            blogService.setToken(user.token)

        }
    }, [dispatch])


    const matchUser = useMatch('/users/:id')
    const user = matchUser
        ? users.find(user => user.id === matchUser.params.id)
        : null

    const matchBlog = useMatch('/blogs/:id')
    const blog = matchBlog
        ? blogs.find(b => b.id === matchBlog.params.id)
        : null

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(showNotification({ message: `User ${loggedUser.name} succcesfully logged out`, isError: false }, 3))
        dispatch(setUser(null))
        window.localStorage.clear()
        navigate('/')

    }
    return (
        <Container>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" component="div" sx={{ m: 1 }}>BlogList App</Typography>
                    <Box sx={{ flexGrow: 1 }}>
                        <Button color="inherit" sx={{ m: 1 }} component={Link} to="/">Blogs</Button>
                        <Button color="inherit" sx={{ m: 1 }} component={Link} to="/users">Users</Button>
                        { loggedUser && <Button color="inherit" sx={{ m: 1 }} component={Link} to="/create">Create New</Button>}
                    </Box>
                    {loggedUser &&
                    <Box sx={{ flexGrow: 0 }}>
                        <Typography variant="h8">Logged in as {loggedUser.name}</Typography>
                    </Box>
                    }
                    <Box sx={{ flexGrow: 0 }}>
                        { loggedUser
                            ?
                            <Button color="inherit" sx={{ m: 1 }} onClick={handleLogout}>Logout</Button>
                            :
                            <Button color="inherit" sx={{ m: 1 }} component={Link} to="/login">Login</Button>
                        }
                    </Box>
                </Toolbar>
            </AppBar>

            <Notification/>
            <Paper sx={{ p: 2 }}>
                <Routes>
                    <Route path="/users" element={ <UsersList users={users}/> } />
                    <Route path="/users/:id" element={ <User user={user}/>} />
                    <Route path="/" element={ <Blogs blogs={blogs}/> } />
                    <Route path="/blogs/:id" element={ <Blog blog={blog} user={loggedUser} />} />
                    <Route path="/create" element={ <BlogForm />} />
                    <Route path="/login" element={ <LoginForm />} />
                </Routes>
            </Paper>
        </Container>
    )
}

export default App