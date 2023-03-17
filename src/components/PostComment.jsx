import React, {useState, useContext} from "react";
import { postComment } from "../api";
import { UserContext } from "../contexts/LoggedInUserContext";

export default function PostComment({ review_id, addComment }) {
  const [comment, setComment] = useState("");
  const [err, setErr] = useState(null);
  const userValueFromContext = useContext(UserContext);

const username = userValueFromContext.user.username
  const handleChange = (event) => {
    setComment(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    postComment(review_id, comment, username)
      .then((comment) => {
        addComment(comment);
      })
      .catch((err) => {
        setErr(err);
        setComment(" ");
      });
  };

  if (err) {
    return <p>error : {err}</p>;
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Post Comment :{" "}
          <input
            value={comment}
            onChange={handleChange}
            type="text"
            required
            placeholder={!username ? "please sign in" : null}
          ></input>
        </label>{" "}
        <button  type="submit">
          {" "}
          Submit
        </button>
      </form>
    );
  }
}
