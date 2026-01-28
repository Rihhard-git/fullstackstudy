const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
    const res = await fetch(baseUrl)
    if (!res) {
        throw new Error('Failed to getch anecdotes')
    }
    return await res.json()
}

export const createAnecdote = async (newAnecdote) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(newAnecdote)
    }

    const res = await fetch(baseUrl, options)

    if (!res.ok) {
        throw new Error('Failed to create new anecdote')
    }

    return await res.json()
}

export const voteAnecdote = async (votedAnecdote) => {
    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(votedAnecdote)
    }

    const res = await fetch(`${baseUrl}/${votedAnecdote.id}`, options)

    if (!res.ok) {
        throw new Error('Failed to add vote')
    }

    return await res.json()
}