import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useState } from 'react'
import LoginForm from './components/LoginForm'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client/react'
import { ALL_AUTHORS, ALL_BOOKS, ALL_GENRES, USER, BOOK_ADDED } from './queries'

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const [genre, setGenre] = useState('')
  const [recommend, setRecommend] = useState(false)

  const navigate = useNavigate()

  const client = useApolloClient()
  const resultBooks = useQuery(ALL_BOOKS, { variables: { genre } })
  const resultAuthors = useQuery(ALL_AUTHORS)
  const resultGenres = useQuery(ALL_GENRES)
  const resultUser = useQuery(USER)

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      window.alert(`New book '${data.data.bookAdded.title}' added`)
    }
  })

  if (resultAuthors.loading || resultBooks.loading || resultGenres.loading || resultUser.loading) {
    return <div>loading...</div>
  }

  const books = resultBooks.data.allBooks
  const authors = resultAuthors.data.allAuthors
  const genres = resultGenres.data.allGenres
  const user = resultUser.data.me

  const padding = { padding: 5 }

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  const handleRecommend = () => {
      setGenre(user.favoriteGenre)
      setRecommend(true)
      navigate('/books')
    
  }
  const handleResetRecommendation = () => {
    setGenre('')
    setRecommend(false)
  }

  return (

    <>
      <div>
        <Link style={padding} to="/authors">authors</Link>
        <Link style={padding} onClick={handleResetRecommendation} to="/books">books</Link>
        {token ? 
          <>
          <Link style={padding} to="/add">add book</Link>
          <button onClick={handleRecommend}>recommend</button>
          <button onClick={handleLogout}>logout</button>
          </>   
          : 
          <Link style={padding} to="/login">login</Link>}
        
      </div>

      <Routes>
        <Route path="/authors" element={<Authors allAuthors={authors}/>} />
        <Route path="/books" element={<Books allGenres={genres} allBooks={books} genre={genre} setGenre={setGenre} user={user} recommend={recommend}/>} />
        <Route path="/add" element={<NewBook refetch={resultBooks.refetch}/>} />
        <Route path='/login' element={<LoginForm setToken={setToken} refetch={resultUser.refetch} />} />
      </Routes>
      <br/>
      <div>
        <i>Library App, Full Stack Open 2026</i>
      </div>
    </>
    
  )
}

export default App