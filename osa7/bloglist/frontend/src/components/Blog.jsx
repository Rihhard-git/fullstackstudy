import { useDispatch } from 'react-redux'
import { commentBlog, deleteBlog, updateBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Blog = ({ blog, user }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [comment, setComment] = useState('')


    if(!blog) {
        return null
    }


    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    const handleLike = (blog) => {
        dispatch(updateBlog(blog))
        dispatch(showNotification({ message: `you voted ${blog.title}`, isError: false }, 5))
    }

    const handleDelete = (e) => {
        e.preventDefault()
        if(window.confirm(`Remove blog ${blog.title}`)) {
            console.log('trying to delete blog:', blog)
            dispatch(deleteBlog(blog.id))
            dispatch(showNotification({ message: `Blog '${blog.title}' deleted succesfully`, isError: false }, 5))
            navigate('/')
        }
    }

    const handleComment = (e) => {
        e.preventDefault()
        dispatch(commentBlog(blog.id, { comment: comment }))
        setComment('')
    }

    return (
        <>
            <h2>
                Blogs
            </h2>
            <div style={blogStyle}>

                <h2>{blog.title}</h2>
                <p>
                    <a href={blog.url}>{blog.url}</a>
                </p>
                <p>
                    {blog.likes} likes <button onClick={() => handleLike(blog)}>like</button>
                </p>
                <p>
                    added by {blog.author}
                    {user && blog.user === user.id
                        ?
                        <button onClick={handleDelete}>remove</button>
                        : null }
                </p>

                <h3>comments</h3>
                <input type="text" value={comment} onChange={({ target }) => setComment(target.value)}/>
                <button onClick={handleComment}>add comment</button>
                <ul>
                    {blog.comments.map(c => <li key={blog.comments.indexOf(c)}>{c}</li>)}
                </ul>
            </div>
        </>
    )
}

export default Blog