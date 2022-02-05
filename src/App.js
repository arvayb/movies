import "./App.css";
import { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import Movies from "./Movies";
import RelatedMovies from "./RelatedMovies";

function App() {
  let titleInput = "";
  const [title, setTitle] = useState("");
  const [related, setRelated] = useState(false);
  const [movieId, setMovieId] = useState(null);

  const handleTitleChange = (e) => {
    titleInput = e.target.value;
  };

  const handleSearchClick = () => {
    setRelated(false);
    setTitle(titleInput);
  };

  const handleRelatedClick = (movieId) => {
    console.log(movieId);
    setRelated(true);
    setMovieId(movieId);
  };

  return (
    <div className="App">
      <h2>Search Movies</h2>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <TextField
            label="Movie title"
            id="title"
            type="text"
            placeholder="Title"
            size="small"
            variant="outlined"
            onChange={handleTitleChange}
          />
        </Grid>
        <Grid item xs={8}>
          <Button variant="contained" size="small" onClick={handleSearchClick}>
            Search
          </Button>
        </Grid>
        <Grid item xs={12}>
          {related ? (
            <RelatedMovies
              movieId={movieId}
              onRelatedClick={handleRelatedClick}
            />
          ) : title ? (
            <Movies title={title} onRelatedClick={handleRelatedClick} />
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
