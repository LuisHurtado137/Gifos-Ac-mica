import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

import "../Gifs/Gifs.css";

export default function Gifs() {
  const { state, handlerGifLoades } = useContext(AppContext);
  const [numberOfGifsLoaded, setNumberOfGifsLoaded] = useState(0);

  const handleOnLoad = () => {
    handlerGifLoades(numberOfGifsLoaded);
    setNumberOfGifsLoaded(numberOfGifsLoaded + 1);
    if (numberOfGifsLoaded === 11) {
      setNumberOfGifsLoaded(0);
    }
  };

  const containerGifs = (
    <div className={`container-gifs`}>
      {state.gifs.map((gif) => {
        return (
          <img
            key={gif.id}
            src={gif.images.fixed_height.url}
            title={gif.title}
            onLoad={handleOnLoad}
            alt="Gif"
          />
        );
      })}
    </div>
  );
  return <>{state.gifs.length > 0 && containerGifs}</>;
}
