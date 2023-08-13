import axios from "axios";

const beNcGamesApi = axios.create({
  baseURL: "https://mohamed-nc-game-backend.onrender.com/api",
});

export const getReviews = (page, category, sort_by, order) => {
  return beNcGamesApi
    .get("/reviews", {
      params: { p: page, category, sort_by, order },
    })
    .then(({ data }) => {
      return data;
    });
};

export const getReview = (id) => {
  return beNcGamesApi.get(`/reviews/${id}`).then(({ data }) => {
    return data.review;
  });
};

export const getComments = (id, page) => {
  return beNcGamesApi
    .get(`/reviews/${id}/comments`, {
      params: { p: page },
    })
    .then(({ data }) => {
      return data.comments;
    });
};

export const patchReview = (id, obj) => {
  return beNcGamesApi.patch(`/reviews/${id}`, obj).then(({ data }) => {
    return data.review;
  });
};

export const postComments = (id, obj) => {
  return beNcGamesApi.post(`/reviews/${id}/comments`, obj).then(({ data }) => {
    return data.comment;
  });
};

export const getCategories = () => {
  return beNcGamesApi.get("/categories").then(({ data }) => {
    return data.categories;
  });
};

export const deleteComment = (id) => {
  return beNcGamesApi.delete(`/comments/${id}`);
};
