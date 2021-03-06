import { gql, useReactiveVar } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { likedIds } from "../apollo";

const Container = styled.div`
  height: 800px;
  border-radius: 7px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: transparent;
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
`;

export default ({ id, bg, isLiked }) => {
  const curLikedIds = useReactiveVar(likedIds);

  const toggleLike = () => {
    if (isLiked) {
      likedIds(curLikedIds.filter((t) => !(t === id)));
    } else {
      likedIds(curLikedIds.concat(id));
    }
  };

  return (
    <Container>
      <Link to={`/${id}`}>
        <Poster bg={bg} />
      </Link>
      <button onClick={toggleLike}>{isLiked ? "Unlike" : "Like"}</button>
    </Container>
  );
};
