import { useEffect, useState } from "react";
import styles from "./MovieCard.module.css";
import MovieDescription from "../MovieDescription/MovieDescription";
import { translateAutoText } from "../../utils/translator";

const MODAL_TEXT = {
  en: {
    watch: "Watch",
    rating: "Rating",
    duration: "Duration",
    cast: "Cast",
    genre: "Genre",
    plot: "Synopsis",
  },
  pt: {
    watch: "Assistir",
    rating: "Avaliação",
    duration: "Duração",
    cast: "Elenco",
    genre: "Gênero",
    plot: "Sinopse",
  },
  es: {
    watch: "Ver",
    rating: "Valoración",
    duration: "Duración",
    cast: "Reparto",
    genre: "Género",
    plot: "Sinopsis",
  },
};

const MovieCard = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [translatedType, setTranslatedType] = useState(props.Type);
  // console.log(isModalOpen);

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  useEffect(() => {
    let isMounted = true;

    const run = async () => {
      if (props.language === "en") {
        if (isMounted) setTranslatedType(props.Type);
        return;
      }

      const result = await translateAutoText(props.Type, props.language);
      if (isMounted) setTranslatedType(result || props.Type);
    };

    run();

    return () => {
      isMounted = false;
    };
  }, [props.Type, props.language]);

  const modalText = MODAL_TEXT[props.language] || MODAL_TEXT.en;

  return (
    <>
      <div className={styles.movie} onClick={toggleModal}>
        <div>
          <p>{props.Year}</p>
        </div>

        <div>
          <img src={props.Poster} alt={props.Title} />
        </div>

        <div>
          <span>{translatedType}</span>
          <h3>{props.Title}</h3>
        </div>
      </div>

      {isModalOpen && (
        <MovieDescription
          apiUrl={props.apiUrl}
          movieID={props.imdbID}
          click={toggleModal}
          language={props.language}
          labels={modalText}
        />
      )}
    </>
  );
};

export default MovieCard;
