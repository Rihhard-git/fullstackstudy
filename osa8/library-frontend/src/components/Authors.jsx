import { useMutation} from "@apollo/client/react"
import { ALL_AUTHORS, ALL_BOOKS, UPDATE_AUTHOR } from "../queries"
import { useState } from "react"

const Authors = ({ allAuthors, }) => {
  
  const [born, setBorn] = useState('')
  const [authorToUpdate, setAuthorToUpdate] = useState('')

  const [ setAuthor ] = useMutation(UPDATE_AUTHOR, {  
      refetchQueries: [
        { query: ALL_AUTHORS }
      ]
    })
  
  const authors = allAuthors

  const updateAuthor = (e) => {
    e.preventDefault()
    setAuthor({ variables: { name: authorToUpdate, setBornTo: born }})
    setBorn('')
  }

  return (
    <>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={updateAuthor}>
            <div>
              name
              <select
                onChange={({ target }) => {
                  setAuthorToUpdate(target.value)}
                }      
              > 
                <option>Pick Author...</option>
                {authors.map(a => (
                  <option key={a.id} value={a.name}>{a.name}</option>
                ))}
              </select>
            </div>
            <div>
              born
              <input 
                value={born}
                onChange={({ target }) => setBorn(parseInt(target.value))}
                />
            </div>
            <button type="submit">update author</button>
        </form>
      </div>
    </>
    

  )
}

export default Authors