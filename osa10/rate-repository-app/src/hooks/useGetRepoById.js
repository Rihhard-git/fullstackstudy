import { useQuery } from '@apollo/client/react';

import { GET_REPO_BY_ID } from '../graphql/queries';

const useGetRepositoryById = (id) => {
  const { data, error, loading } = useQuery(GET_REPO_BY_ID, {
    variables: {id},
    fetchPolicy: 'cache-and-network'
  })

  return { data, error, loading};
};

export default useGetRepositoryById;
