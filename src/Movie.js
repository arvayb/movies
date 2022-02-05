import "./Movie.css";
import { Card, Popover } from "@mui/material";
import { useState } from "react";
import MovieDetails from "./MovieDetails";

function Movie(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleNameClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  let genres = props.genres.map((genre) => {
    return genre.name;
  });
  return (
    <Card className="movie-card">
      <span className="clickable movie-name" onClick={handleNameClick}>
        {props.name}
      </span>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <MovieDetails
          movieId={props.id}
          query={props.name}
          onRelatedClick={props.onRelatedClick}
        />
      </Popover>
      <br />
      {genres.join(", ")}
      <br />
      {`${props.popularity} (${props.votes})`}
    </Card>
  );
}

export default Movie;
