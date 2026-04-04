import { useQuery } from '@apollo/client/react';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy, orderDirection, searchKeyword) => {

  

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderBy: orderBy,
      orderDirection: orderDirection,
      searchKeyword: searchKeyword
    },
    fetchPolicy: 'cache-and-network'
  })

  return {data, error, loading};
};

export default useRepositories;
