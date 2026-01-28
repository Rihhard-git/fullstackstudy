import { useDispatch } from "react-redux"
import { appendAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const getId = () => (100000 * Math.random()).toFixed(0)

    const asObject = anecdote => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
    }

    const addAnecdote = async (e) => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        /* const newAnecdote = await anecdoteService.createNew(asObject(content))
        dispatch(createAnecdote(newAnecdote)) */
        dispatch(appendAnecdote(asObject(content)))
        dispatch(setNotification(`new anecdote '${content}' was created`, 5))
    }

    return (

        <div>
           <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <input name="anecdote" />
                <button type="submit">add</button>
            </form> 
        </div>
        
    )
}

export default AnecdoteForm
