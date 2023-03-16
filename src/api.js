import axios from "axios";

// export const getReviews = (queries) => {
// 	return fetch(
// 		`https://mohamed-nc-game-backend.onrender.com/api/reviews`
// 	).then((data) => {
// 		return data.json();
// 	});
// };

const ncGameApi = axios.create({
	baseURL: "https://mohamed-nc-game-backend.onrender.com/api",
  });
  
  export const getReviews = () => {
	return ncGameApi.get("/reviews").then(({ data }) => {
	  console.log(data);
	  return data.reviews;
	});
  };

export const getSingleReview = (review_id) => {
  return ncGameApi.get(`/reviews/${review_id}`).then(({ data }) => {
    return data.review;
  });
};

export const getCommentsOfReview = (review_id) => {
  return ncGameApi.get(`/reviews/${review_id}/comments`).then(({ data }) => {
    return data;
  });
};

export const patchVotes = (review_id) => {
  console.log(review_id);
  return ncGameApi
    .patch(`/reviews/${review_id}`, { inc_votes: 1 })
    .then(({ data }) => {
      console.log(data);
      return data;
    });
};
export const postComment = (review_id, input) => {
	return ncGameApi
	  .post(`/reviews/${review_id}/comments`, {
		body: input,
		username: "grumpy19",
	  })
	  .then(({ data }) => {
		return data;
	  });
  };
  
  export const getUsers = () => {
	return ncGameApi.get("/users").then(({ data }) => {
	  console.log(data);
	  return data.users;
	});
  };

  
export const patchVotesMinus = (review_id) => {
  return ncGameApi
    .patch(`/reviews/${review_id}`, { inc_votes: -1 })
    .then(({ data }) => {
      console.log(data, "patch minus votes")
      return data;
    });
};


export const getCategories = () => {
  return ncGameApi.get("/categories").then(({ data }) => {
    console.log(data, "data categories")

    return data.categories;
  });
};