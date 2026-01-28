import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'


const AnecdoteForm = () => {

    const { notificationDispatch } = useContext(NotificationContext)

    const getId = () => (100000 * Math.random()).toFixed(0)

    const asObject = anecdote => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
    }

    const queryClient = useQueryClient()

    const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError:() => {
      notificationDispatch({type: 'ERROR'})
      setTimeout(() => notificationDispatch({type: 'HIDE'}), 5000)
    }
    })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate(asObject(content))
    notificationDispatch({type: 'ADD_ANECDOTE', payload: content})
    setTimeout(() => notificationDispatch({type: 'HIDE'}), 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
