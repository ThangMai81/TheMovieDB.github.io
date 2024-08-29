import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFetchData } from "../../http";
import Banner from "./Banner";
import MovieList from "./MovieList";
import Navbar from "./Navbar";
function Browse() {
  // -----------------------first initialization---------------
  const [changeBgNav, setChangeBgNav] = useState(false);
  const [randomFilm, setRandomFilm] = useState({});
  const [allFilm, setAllFilm] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  // ---------------function that triggered when event happened --------------------
  // change route when click button
  function handleChangeRoute(page) {
    if (page === "homepage") {
      navigate("/");
    }
    if (page === "search") {
      navigate("/search");
    }
  }
  function handleScroll() {
    if (window.scrollY > 0) {
      setChangeBgNav(true);
    } else {
      setChangeBgNav(false);
    }
  }
  // ----------------------useEffect for handleScroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // useEffect for update UI when finishing fetched data
  useEffect(() => {
    try {
      // * function to get fetched data
      async function getData() {
        setIsLoading(true);
        const data = await getFetchData();
        const randomFilm =
          // Choose netflix category
          data[1].results[
            Math.floor(Math.random() * data[1].results.length - 1)
          ];
        setRandomFilm(randomFilm);
        setAllFilm(data);
        setIsLoading(false);
        setError(false);
      }
      getData();
    } catch (error) {
      setError(true);
    }
  }, []);
  return (
    <div className={`app relative bg-black`}>
      {/* Link to use icon from fontawesome */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      {/* Navigation bar (with position fixed) */}
      <Navbar changeBgNav={changeBgNav} handleChangeRoute={handleChangeRoute} />
      {/* Banner  */}
      <Banner isLoading={isLoading} randomFilm={randomFilm} error={error} />
      <MovieList isLoading={isLoading} allFilm={allFilm} error={error} />
    </div>
  );
}

export default Browse;
