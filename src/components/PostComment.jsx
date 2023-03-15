// import { useEffect, useState } from "react";
// import { postComment } from "../api";

// export const PostComment = ({ setComments, review_id }) => {
//   const [input, setInput] = useState("");
//   const [newComment, setNewComment] = useState("");
//   const [posting, setPosting] = useState(false);

//   const handleComment = (event) => {
//     setInput(event.target.value);
//   };

//   const handlePost = (event) => {
//     event.preventDefault();
//     setPosting(true);
//     //^^ attempt at disabling text area whilst the comment is being posted

//     postComment(review_id, input).then((newCommentFromApi) => {
//       console.log(newCommentFromApi);
//       setComments((currComment) => {
//         return [newCommentFromApi, ...currComment];
//       });
//     });
//     setInput("");
//     setPosting(false);
//   };
//   return (
//     <form onSubmit={handlePost}>
//       <input
//         value={input}
//         type="text"
//         placeholder="Add a comment..."
//         onChange={handleComment}
//         disabled={posting}
//       />
//       <button type="submit">Post</button>
//     </form>
//   );
// };
import React, {useState} from "react";

import { postComment } from "../api";

export default function PostComment({ review_id, addComment }) {
  const [comment, setComment] = useState("");
  const [err, setErr] = useState(null);

  const handleChange = (event) => {
    setComment(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    postComment(review_id, comment)
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
            // placeholder={!username ? "please sign in" : null}
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
