import { Typography } from "@mui/material";
import React, { memo } from "react";
import Error from "../../components/Error";
import Spinner from "../../components/Spinner";
import Cards from "./Cards";

export default memo(function CardsFeedback({
  isLoading,
  cards,
  error,
  handleDelete,
  handlelike
}) {
  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  if (cards && cards.length === 0) {
    return (
      <Typography>
        Oops... it seems there are no business cards to display
      </Typography>
    );
  }
  if (cards) return <Cards cards={cards} handleDelete={handleDelete} handleLike={handlelike}/>;
  return null;
});
