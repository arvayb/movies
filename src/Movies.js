import { gql, useQuery } from "@apollo/client";
import Movie from "./Movie";
import { CircularProgress, Grid } from "@mui/material";
import { v4 as uuid } from "uuid";

function Movies(props) {
  const GET_MOVIES = gql`
    query SearchMovies($title: String!) {
      searchMovies(query: $title) {
        id
        name
        genres {
          id
          name
        }
        popularity
        votes
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_MOVIES, {
    variables: { title: props.title },
  });
  console.log(data);

  if (loading) {
    return <CircularProgress />;
  }
  if (error && props.title !== "") {
    console.log(error);
    return <div>Error!</div>;
  }

  console.log(data);

  return (
    <Grid container spacing={2}>
      {data.searchMovies.map((movie) => {
        return (
          <Grid key={uuid()} item xs={3}>
            <Movie
              key={movie.id}
              id={movie.id}
              name={movie.name}
              genres={movie.genres}
              popularity={movie.popularity}
              votes={movie.votes}
              onRelatedClick={props.onRelatedClick}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default Movies;
