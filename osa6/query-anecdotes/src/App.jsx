import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, voteAnecdote } from './requests'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const App = () => {

  const { notificationDispatch } = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const votedAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    
    votedAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    notificationDispatch({type: 'VOTE_ANECDOTE', payload: anecdote.content})
    setTimeout(() => notificationDispatch({type: 'HIDE'}), 5000)
    console.log('vote')
  }

  const {data, isError, isLoading} = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 3
  })
  if (isError) {
    return <span>anecdote service not available due to problems in server</span>
  }
 
  if (isLoading) {
    return <div>loading data...</div>
  }

  const anecdotes = data


  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
