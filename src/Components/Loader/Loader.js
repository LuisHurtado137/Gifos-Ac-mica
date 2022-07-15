import React from "react";
import "../Loader/Loader.css";

export default function Loading() {
  const LOADING = "Buscando tus gifs...";

  return (
    <>
      {LOADING}
      <br />
      <span class="loader"></span>
    </>
  );
}
