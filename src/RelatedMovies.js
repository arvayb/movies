import { gql, useQuery } from "@apollo/client";
import Movie from "./Movie";
import { CircularProgress, Grid } from "@mui/material";
import { v4 as uuid } from "uuid";

function RelatedMovies(props) {
  const GET_RELATED_MOVIES = gql`
    query getMovie($movieId: ID!) {
      movie(id: $movieId) {
        similar {
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
    }
  `;

  const { loading, error, data } = useQuery(GET_RELATED_MOVIES, {
    variables: { movieId: props.movieId },
  });
  console.log(data);

  if (loading) {
    return <CircularProgress />;
  }
  if (error && props.movieId !== "") {
    console.log(error);
    return <div>Error!</div>;
  }

  console.log(data);

  return (
    <Grid container spacing={2}>
      {data.movie.similar.map((movie) => {
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

export default RelatedMovies;
