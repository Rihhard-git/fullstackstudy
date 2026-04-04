import { useQuery } from '@apollo/client/react';

import { GET_REVIEWS} from '../graphql/queries';

const useReviews = (id) => {
  const { data, error, loading } = useQuery(GET_REVIEWS, {
    variables: {id},
    fetchPolicy: 'cache-and-network'
  })

  return {data, error, loading};
};

export default useReviews;
