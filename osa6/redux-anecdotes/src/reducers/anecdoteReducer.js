import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

/* const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
] */


/* const initialState = anecdotesAtStart.map(asObject) */

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {     
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(a => a.id === id)
      const votedAnecdote = {
        ...anecdoteToVote, votes: anecdoteToVote.votes +1
      }
      return state.map(a => (a.id !== id ? a : votedAnecdote))
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})
const { setAnecdotes, createAnecdote, voteAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}
export const updateAnecdote = (data) => {
  return async (dispatch) => {    
    const updatedAnecdote = await anecdoteService.update(data)
    dispatch(voteAnecdote(updatedAnecdote.id))
  }
}

/* export const { voteAnecdote } = anecdoteSlice.actions */
export default anecdoteSlice.reducer
