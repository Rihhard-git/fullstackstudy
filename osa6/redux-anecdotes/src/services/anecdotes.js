const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const res = await fetch(baseUrl)

    if (!res.ok) {
        throw new Error('Failed to fetch anecdotes')
    }

    return await res.json()
}
const createNew = async (content) => {
    const res = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(content)
    })

    if (!res.ok) {
        throw new Error('Failed to create anecdote')
    }
    return await res.json()
}

const update = async (data) => {
    const res = await fetch(`${baseUrl}/${data.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({"votes": data.votes + 1 })
    })
    if (!res.ok) {
        throw new Error('Failed to update anecdote')
    }
    const updatedData = await res.json()
    console.log(updatedData)
    return updatedData
}

export default { getAll, createNew, update }