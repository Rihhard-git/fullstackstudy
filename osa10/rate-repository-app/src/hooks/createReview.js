import { useMutation } from '@apollo/client/react';

import { CREATE_REVIEW } from '../graphql/mutations';

const createReview = () => {

    const [mutate, result] = useMutation(CREATE_REVIEW)

    const review = async (reviewObject) => {

      const { data, loading } = await mutate({variables: reviewObject})

      return { data, loading } 
    }

    return [review, result]

};

export default createReview;

