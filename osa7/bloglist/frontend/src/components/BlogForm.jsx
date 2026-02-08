import { useState } from 'react'
import { appendBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'
import Togglable from './Togglable'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CardHeader from '@mui/material/CardHeader'
import TextField from '@mui/material/TextField'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'

const BlogForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        const blogObject = {
            title: title,
            author: author,
            url: url
        }
        blogService.setToken(user.token)
        dispatch(appendBlog(blogObject))
        dispatch(showNotification({ message: `New blog '${title}' was created`, isError: false }, 3))
        setTitle('')
        setAuthor('')
        setUrl('')
        navigate('/')
    }
    const handleCancel = (e) => {
        e.preventDefault()
        navigate('/')
    }

    return (

        <Box>
            <Card variant='outlined' sx={{ width: 300 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">Create new blog</Typography>
                    <TextField
                        label="title"
                        size='small'
                        sx={{ p: 1 }}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                    <TextField
                        label="author"
                        size='small'
                        sx={{ p: 1 }}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                    <TextField
                        label="url"
                        size='small'
                        sx={{ p: 1 }}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </CardContent>
                <CardActions>
                    <Button variant="contained" onClick={handleSubmit}>Create</Button>
                    <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
                </CardActions>
            </Card>
        </Box>


    /* <div>
            <h3>create new</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                    title:
                        <input
                            type="text"
                            value={title}
                            onChange={({ target }) => setTitle(target.value)}
                        />
                    </label>

                </div>
                <div>
                    <label>
                    author:
                        <input
                            type="text"
                            value={author}
                            onChange={({ target }) => setAuthor(target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                    url:
                        <input
                            type='text'
                            value={url}
                            onChange={({ target }) => setUrl(target.value)}
                        />
                    </label>
                </div>
                <button type="submit">create</button>
            </form>
            <button onClick={handleCancel}>cancel</button>
        </div> */
    )
}

export default BlogForm