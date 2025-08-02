import { API } from "../config";

const deleteReview = async (reviewId: string) => {
  return await API.delete(`/api/v1/reviews/${reviewId}`)
    .then(({ data }) => data)
    .catch((error) => {
      console.error("Failed to fetch review", error);
      throw error;
    });
};
const editReview = async (reviewId: string) => {
  return await API.patch(`/api/v1/reviews/${reviewId}`)
    .then(({ data }) => data)
    .catch((error) => {
      console.error("Failed to fetch review", error);
      throw error;
    });
};

export const reviewAPI = {
  deleteReview,
  editReview,
};
