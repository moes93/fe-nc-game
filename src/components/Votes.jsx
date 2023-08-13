import { useState } from "react";
import { patchReview } from "../api/api";
import Stack from 'react-bootstrap/Stack';
import Button from "react-bootstrap/Button";

export const Votes = ({ votes, setVotes, review_id }) => {
  const [err, setErr] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleUp = () => {
    setVotes((currVotes) => currVotes + 1);
    setHasVoted(true);
    setErr(null);

    patchReview(review_id, {
      inc_votes: 1,
    }).catch(() => {
      setVotes((currVotes) => currVotes - 1);
      setErr("oops we got some connection issues, sorry...");
    });
  };

  const handleDown = () => {
    setVotes((currVotes) => currVotes - 1);
    setHasVoted(false);
    setErr(null);

    patchReview(review_id, {
      inc_votes: -1,
    }).catch(() => {
      setVotes((currVotes) => currVotes + 1);
      setErr("oops we got some connection issues, sorry...");
    });
  };

  return (
    <Stack className="col-md-2 mx-auto">
      <h3 className="text-center">Votes: {votes}</h3>
      {err ? <p>{err}</p> : null}
      <Button className="my-1" onClick={handleUp} disabled={hasVoted}>
        +
      </Button>
      <Button className="my-1" onClick={handleDown} disabled={!hasVoted}>
        -
      </Button>
    </Stack>
  );
};
