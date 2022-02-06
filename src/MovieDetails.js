import "./MovieDetails.css";
import { CircularProgress, Link } from "@mui/material";
import { Fragment, useEffect, useState } from "react";

function MovieDetails(props) {
  const [summary, setSummary] = useState("");
  const [wikipediaLink, setWikipediaLink] = useState("");
  const [loading, setLoading] = useState(true);

  const imdbLink = `https://imdb.com/find?q=${props.query}`;

  useEffect(() => {
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${props.query}`)
      .then((response) => response.json())
      .then((response) => handleWikiApiResponse(response));
  }, [props.query]);

  const handleWikiApiResponse = (response) => {
    if (response.extract) {
      setSummary(response.extract);
      setWikipediaLink(response.content_urls.desktop.page);
    } else {
      setSummary("Wikipedia page not found.");
    }
    setLoading(false);
  };

  const handleRelatedClick = () => {
    props.onRelatedClick(props.movieId);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className="moviedetails-content">
      {summary}
      <br />
      {wikipediaLink ? (
        <Fragment>
          <br />{" "}
          <Link href={wikipediaLink} target="_blank" rel="noopener">
            Wikipedia
          </Link>
          <br />
        </Fragment>
      ) : (
        ""
      )}
      <Link href={imdbLink} target="_blank" rel="noopener">
        IMDB
      </Link>{" "}
      <br />
      <Link className="clickable" onClick={handleRelatedClick}>
        Related movies
      </Link>
    </div>
  );
}

export default MovieDetails;
