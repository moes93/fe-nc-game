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

  export const getCategories = () => {
	return ncGameApi.get("/categories").then(({ data }) => {
		console.log(data, "data api categories")
	  return data.categories;
	});
  };