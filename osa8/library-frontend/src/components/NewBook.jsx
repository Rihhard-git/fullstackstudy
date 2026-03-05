import { useMutation } from '@apollo/client/react'
import { useState } from 'react'
import { CREATE_BOOK } from '../queries'
import { useNavigate } from 'react-router-dom'

const NewBook = ( {refetch} ) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const navigate = useNavigate()

  const [createBook] = useMutation(CREATE_BOOK, {
    onCompleted: () => {
      refetch()    
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    createBook({ variables: { title, author, published, genres }})
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
    refetch()
    navigate('/books')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <h2>add new book</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(parseInt(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook