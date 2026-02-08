import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        createBlog(state, action) {
            state.push(action.payload)
        },
        likeBlog(state, action) {

            const id = action.payload
            const blogToLike = state.find(b => b.id === id)
            const likedBlog = {
                ...blogToLike, likes: blogToLike.likes +1
            }
            return state.map(b => (b.id !== id ? b : likedBlog))
        },
        removeBlog(state, action) {
            const id = action.payload
            return state.filter(b => b.id !== id)
        },
        addComment(state, action) {

            const id = action.payload.id
            const blogToComment = state.find(b => b.id === id)
            const commentedBlog = {
                ...blogToComment, comments: blogToComment.comments.concat(action.payload.data)
            }
            return state.map(b => (b.id !== id ? b : commentedBlog))
        }
    }
})
const { setBlogs, likeBlog, createBlog, removeBlog, addComment } = blogSlice.actions

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}
export const appendBlog = (blogObject) => {
    return async (dispatch) => {
        await blogService
            .create(blogObject)
            .then(blog => {
                dispatch(createBlog(blog))
            })
            .catch(() => {
                dispatch(showNotification({ message: 'Oops! Something went wrong...', isError: true }, 3))
            })

    }
}
export const updateBlog = (data) => {
    return async (dispatch) => {
        const updatedBlog = await blogService.update({ ...data, likes: data.likes +1 })
        dispatch(likeBlog(updatedBlog.id))
    }
}
export const deleteBlog = (id) => {
    return async (dispatch) => {
        await blogService.deleteBlog(id)
        dispatch(removeBlog(id))
    }
}
export const commentBlog = (id, data) => {
    return async (dispatch) => {
        await blogService.comment(id, data)
        dispatch(addComment({ id: id, data: data.comment }))
    }
}

export default blogSlice.reducer