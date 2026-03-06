import { useEffect, useState } from "react";
import styles from "./MovieCard.module.css";
import MovieDescription from "../MovieDescription/MovieDescription";
import { translateAutoText } from "../../utils/translator";

const MovieCard = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [translatedType, setTranslatedType] = useState(props.Type);
  // console.log(isModalOpen);

  const toogleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    let isMounted = true;

    const run = async () => {
      if (!props.translateEnabled) {
        if (isMounted) setTranslatedType(props.Type);
        return;
      }

      const result = await translateAutoText(props.Type, "pt");
      if (isMounted) setTranslatedType(result || props.Type);
    };

    run();

    return () => {
      isMounted = false;
    };
  }, [props.Type, props.translateEnabled]);

  return (
    <>
      <div className={styles.movie} onClick={toogleModal}>
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
          click={toogleModal}
          translateEnabled={props.translateEnabled}
        />
      )}
    </>
  );
};

export default MovieCard;
