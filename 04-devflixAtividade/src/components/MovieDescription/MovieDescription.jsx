import { useEffect, useState } from "react";
import styles from "./MovieDescription.module.css";
import { translateBatch } from "../../utils/translator";

const MovieDescription = (props) => {
  const [movieDesc, setMovieDesc] = useState([]);
  const [translatedType, setTranslatedType] = useState("");
  const [translatedGenre, setTranslatedGenre] = useState("");
  const [translatedPlot, setTranslatedPlot] = useState("");

  useEffect(() => {
    fetch(`${props.apiUrl}&i=${props.movieID}`)
      .then((response) => response.json())
      .then((data) => setMovieDesc(data))
      .catch((error) => console.error(error));
  }, [props.apiUrl, props.movieID]);

  useEffect(() => {
    let isMounted = true;

    const run = async () => {
      if (!movieDesc || !movieDesc.Title) return;

      if (props.language === "en") {
        if (isMounted) {
          setTranslatedType(movieDesc.Type);
          setTranslatedGenre(movieDesc.Genre);
          setTranslatedPlot(movieDesc.Plot);
        }
        return;
      }

      const [typeResult, genreResult, plotResult] = await translateBatch(
        [movieDesc.Type, movieDesc.Genre, movieDesc.Plot],
        props.language,
      );

      if (isMounted) {
        setTranslatedType(typeResult || movieDesc.Type);
        setTranslatedGenre(genreResult || movieDesc.Genre);
        setTranslatedPlot(plotResult || movieDesc.Plot);
      }
    };

    run();

    return () => {
      isMounted = false;
    };
  }, [movieDesc, props.language]);

  const labels = props.labels || {
    watch: "Watch",
    rating: "Rating",
    duration: "Duration",
    cast: "Cast",
    genre: "Genre",
    plot: "Synopsis",
  };

  return (
    <div className={styles.modalBackdrop} onClick={props.click}>
      <div
        className={styles.movieModal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Detalhes do filme"
      >
        <div className={styles.movieInfo}>
          <img src={movieDesc.Poster} alt="" />

          <button className={styles.btnClose} onClick={props.click} aria-label="Fechar detalhes do filme">
            ×
          </button>

          <div className={styles.movieType}>
            <div>
              <img src="/favicon.png" alt="" />
              {translatedType || movieDesc.Type}
              <h1>{movieDesc.Title}</h1>
              <a
                href={`https://google.com/search?q=${encodeURIComponent(movieDesc.Title)}`}
                target="_blank"
                rel="noreferrer"
              >
                ▶️ {labels.watch}
              </a>
            </div>
          </div>
        </div>
        <div className={styles.containerMisc}>
          <div className={styles.containerFlex}>
            {labels.rating}: {movieDesc.imdbRating} | {labels.duration}: {movieDesc.Runtime} |{" "}
            {movieDesc.Released}
          </div>
          <div className={styles.containerFlex}>
            <p>{labels.cast}: {movieDesc.Actors}</p>
            <p>{labels.genre}: {translatedGenre || movieDesc.Genre}</p>
          </div>
        </div>
        <div className={styles.desc}>
          <p>{labels.plot}: {translatedPlot || movieDesc.Plot}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDescription;