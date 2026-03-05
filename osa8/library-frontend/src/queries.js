import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query AllAuthors{
    allAuthors {
    born
    id
    name
    bookCount
  }
  }
`

export const ALL_BOOKS = gql`
  query AllBooks($author: String, $genre: String){
    allBooks(author: $author, genre: $genre) {
    title
    author {
      name,
      born,
      id
    }
    published
    id
    genres
    }
  }
`
export const ALL_GENRES = gql`
  query AllGenres{
    allGenres 
  }
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!,
    $author: String,
    $published: Int,
    $genres: [String]
  ) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation editBornYear($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name,
      born,
      bookCount
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
export const USER = gql`
  query Me {
  me {
    username
    favoriteGenre
    id
  }
}
`