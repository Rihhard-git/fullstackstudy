const Books = ({ allGenres, allBooks, genre, setGenre, user, recommend}) => {

  const genres = allGenres
  const books = allBooks

  return (
    <div>
      {recommend ?
      <div>
      <h2>recommendations</h2>
      <p>books in you favorite genre <b>{user.favoriteGenre}</b></p>
      </div>
      :
      <div>
      <h2>books</h2>
      <p>in genre {genre ?<b>{genre}</b>: <b>all genres</b>}</p>
      {genres.map(g => <button key={g} onClick={(e) => {
        e.preventDefault()
        setGenre(g)
      }}>{g}</button>)}
      <button onClick={(e) => {
        e.preventDefault()
        setGenre('')
      }}>all genres</button>
      </div>
      }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default Books