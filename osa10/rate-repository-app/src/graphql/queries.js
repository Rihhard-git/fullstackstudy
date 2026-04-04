import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
    query ($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String){
       repositories (orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword){
            edges {
                node {
                    description
                    forksCount
                    fullName
                    language
                    ownerAvatarUrl
                    reviewCount
                    stargazersCount
                    id
                    ratingAverage
                }
            }
        } 
    }
`
export const GET_REPO_BY_ID = gql`
    query ($id: ID! ){
        repository(id: $id) {
            description
            forksCount
            fullName
            language
            ownerAvatarUrl
            reviewCount
            stargazersCount
            id
            url
            ratingAverage
        }
    }
`

export const USER = gql`
  query Me ($includeReviews: Boolean = false){
  me {
    username
    id
    reviews @include(if: $includeReviews) {
      edges {
        node {
          id
          text
          createdAt
          rating
          user {
            id
            username
          }
        }
      }
    }
  }
}
`

export const GET_REVIEWS = gql`
    query ($id: ID!){
  repository(id: $id) {
    id
    fullName
    reviews {
      edges {
        node {
          id
          text
          createdAt
          rating
          user {
            id
            username
          }
        }
      }
    }
  }
}    
`