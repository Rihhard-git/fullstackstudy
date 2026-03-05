import { useQuery } from "@apollo/client/react"
import { ALL_BOOKS, USER } from "../queries"

const Recommendations = ( user ) => {

    const resultBooks = useQuery(ALL_BOOKS, { variables: user.favoriteGenre  })

    
    

    if (resultBooks.loading) {
        return <div>loading...</div>
    }
    console.log(resultBooks)
    const books = resultBooks.data.allBooks


    return (
        <div>
            <h2>recommendations</h2>
            <p>books in you favorite genre</p>
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

export default Recommendations