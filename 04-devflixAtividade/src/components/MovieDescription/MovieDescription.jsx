import { useEffect, useState } from "react";
import styles from "./MovieDescription.module.css";
import { translateAutoText } from "../../utils/translator";

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
  }, []);

  useEffect(() => {
    let isMounted = true;

    const run = async () => {
      if (!movieDesc || !movieDesc.Title) return;

      if (!props.translateEnabled) {
        if (isMounted) {
          setTranslatedType(movieDesc.Type);
          setTranslatedGenre(movieDesc.Genre);
          setTranslatedPlot(movieDesc.Plot);
        }
        return;
      }

      const [typeResult, genreResult, plotResult] = await Promise.all([
        translateAutoText(movieDesc.Type, "pt"),
        translateAutoText(movieDesc.Genre, "pt"),
        translateAutoText(movieDesc.Plot, "pt"),
      ]);

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
  }, [movieDesc, props.translateEnabled]);

  return (
    <div className={styles.modalBackdrop} onClick={props.click}>
      <div className={styles.movieModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.movieInfo}>
          <img src={movieDesc.Poster} alt="" />

          <button className={styles.btnClose} onClick={props.click}>
            X
          </button>

          <div className={styles.movieType}>
            <div>
              <img src="/favicon.png" alt="" />
              {translatedType || movieDesc.Type}
              <h1>{movieDesc.Title}</h1>
              <a
                href={`https://google.com/search?q=${encodeURIComponent(movieDesc.Title)}`}
                target="_blank"
              >
                ▶️ Assistir
              </a>
            </div>
          </div>
        </div>
        <div className={styles.containerMisc}>
          <div className={styles.containerFlex}>
            Avaliação: {movieDesc.imdbRating} | Duração: {movieDesc.Runtime} |{" "}
            {movieDesc.Released}
          </div>
          <div className={styles.containerFlex}>
            <p>Elenco: {movieDesc.Actors}</p>
            <p>Gênero: {translatedGenre || movieDesc.Genre}</p>
          </div>
        </div>
        <div className={styles.desc}>
          <p>Sinopse: {translatedPlot || movieDesc.Plot}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDescription;