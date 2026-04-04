import { gql } from "@apollo/client";

export const SIGN_IN = gql`
    mutation SignIn($username: String!, $password: String!) {
        authenticate(credentials: { username: $username, password: $password })  {
        accessToken
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

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      text
      rating
      id
      repository {
        fullName
        ownerName
        id
      }
    }
  }

`

export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput) {
  createUser(user: $user) {
    username
    id
    reviewCount
  }
}
`