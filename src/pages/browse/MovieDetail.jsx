import { useEffect, useState } from "react";
import Youtube from "react-youtube";
import { getMovieDetail } from "../../http";
function MovieDetail({ clickedFilm }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [ytb, setYtb] = useState({});
  // In case the film is clicked again => need to hide the details
  let youtubeSec = <></>;
  if (Object.values(clickedFilm).length === 0) {
    youtubeSec = <></>;
  }
  // Not to render the film for all Category
  useEffect(() => {
    try {
      async function getMovie() {
        setIsLoading(true);
        const response = await getMovieDetail(clickedFilm.id);
        console.log("response in MVDetail: ", response);
        if (Object.keys(response).includes("success") && !response.success) {
          console.log("Error fetching data in MVDetail!");
          setError(true);
        } else {
          setError(false);
        }
        setYtb(response);
        setIsLoading(false);
      }
      getMovie();
    } catch (error) {
      setError(true);
    }
  }, [clickedFilm]);
  if (isLoading === true) {
    // console.log("Loading...");
    youtubeSec = (
      <div className="text-white font-bold text-xl">
        <span>Fetching data, please wait...</span>
      </div>
    );
  }
  if (isError === true) {
    console.log("has touched!");
    youtubeSec = (
      <div className="text-white font-bold text-xl">
        <img
          src={"https://image.tmdb.org/t/p/w500" + clickedFilm.backdrop_path}
        />
      </div>
    );
  } else {
    if (isLoading === false && Object.keys(ytb).includes("results")) {
      // console.log("Show film triggered!");
      // console.log("Clicked film: ", clickedFilm);
      const opts = {
        height: "400",
        width: "100%",
        playerVars: {
          autoplay: 0,
        },
      };
      if (ytb.results.length > 0) {
        // console.log("ytb: ", ytb);
        const siteYoutubeMV = ytb.results.filter(
          (eachMV) => eachMV.site === "YouTube"
        );
        // console.log("siteYoutubeMV: ", siteYoutubeMV);
        const trailerYoutubeMV = siteYoutubeMV.filter(
          (eachMV) => eachMV.type === "Trailer"
        );
        // console.log("check siteYoutubeMV: ", trailerYoutubeMV);
        const teaserYoutubeMV =
          trailerYoutubeMV.length === 0
            ? siteYoutubeMV.filter((eachMV) => eachMV.type === "Teaser")
            : [];
        // console.log("All MV can be shown: ", teaserYoutubeMV, trailerYoutubeMV);
        if (trailerYoutubeMV.length > 0 || teaserYoutubeMV.length > 0) {
          let firstMVInListKey = "";
          firstMVInListKey =
            teaserYoutubeMV.length > 0
              ? teaserYoutubeMV[0].key
              : trailerYoutubeMV[0].key;
          // console.log("firstMvInListKey: ", typeof firstMVInListKey);
          youtubeSec = <Youtube videoId={firstMVInListKey} opts={opts} />;
        } else {
          // If there's video but with type not trailer or teaser, show backdrop_path instead
          youtubeSec = (
            <img
              src={
                "https://image.tmdb.org/t/p/w500" + clickedFilm.backdrop_path
              }
            />
          );
        }
      }
      // in case the api doesn't give list of youtube's descriptions, example from console
      // Object
      // id: 222289
      // results: []
      // length: 0
      // [[Prototype]]: Array(0)[[Prototype]]: Object
      if (ytb.results.length === 0) {
        youtubeSec = (
          <div className="text-white font-bold text-xl">
            <span>There's no video to describe this due to API 😭</span>
            <img
              src={
                "https://image.tmdb.org/t/p/w500" + clickedFilm.backdrop_path
              }
            />
          </div>
        );
      }
    }
  }
  const textStyled = "absolute text-white font-bold text-2xl";
  return (
    <div className="grid grid-cols-2">
      <div className="relative">
        {/* This div for border botton */}
        <h1
          className={`${textStyled} top-[100px] left-[50px]  border-2 border-black border-b-slate-100 w-[500px] pb-[20px]`}
        >
          {clickedFilm.original_title}
        </h1>
        <span className={`${textStyled} top-[170px] left-[50px] text-xl`}>
          Release Date: {clickedFilm.release_date}
        </span>
        <span className={`${textStyled} top-[200px] left-[50px] text-xl`}>
          Vote: {`${clickedFilm.vote_average}/10`}
        </span>
        <p
          className={`${textStyled} top-[230px] left-[50px] font-normal text-sm max-w-[500px]`}
        >
          {clickedFilm.overview}
        </p>
      </div>
      {youtubeSec}
    </div>
  );
}
export default MovieDetail;
