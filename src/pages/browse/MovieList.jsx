import styled from "styled-components";
import { useState } from "react";
import MovieDetail from "./MovieDetail";
// Slider
const Slider = styled.div`
  &::-webkit-scrollbar {
    height: 5px;
  }

  &::-webkit-scrollbar-track {
    background: #888;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #666;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

function MovieList({ isLoading, allFilm, error }) {
  // Có 1 số movie mặc dù không có lỗi, vẫn tìm ra video bình thường nhưng không hiển thị được (không hiển thị lỗi gì trong console).
  // Lúc này mentor hãy ấn lại video đó (như bình thường) để ẩn video và thông tin đi kèm đi và click video khác để thử,
  // kết quả sẽ như mong muốn (đã test)
  // Ngoài ra, để thử full chức năng, mentor hãy thử video ở hạng mục xếp hạng cao, lúc này sẽ gặp ít lỗi hơn
  let result = <></>;
  const [isClicked, setIsClicked] = useState({
    clicked: false,
    film: "",
  });
  const [clickedFilm, setClickedFilm] = useState({});
  // If data is fetching
  // className for showing fetch data or error
  const sideEff = "text-white font-bold font-sans text-lg absolute left-50";
  // if some error is happening...
  if (error === true) {
    return (
      <div className="relative w-full">
        <span className={sideEff}>
          Something wrong when fetching data, you can try reload the page again
          to check...
        </span>
      </div>
    );
  }
  // if fetching data is happening...
  if (isLoading === true) {
    return (
      <div className="relative w-full">
        <span className={sideEff}>Fetching data...</span>;
      </div>
    );
  }
  const title = [
    "Original",
    "Xu hướng",
    "Xếp hạng cao",
    "Hành động",
    "Hài",
    "Kinh dị",
    "Lãng mạn",
    "Tài liệu",
  ];
  // function to show details of movie when click movie
  function handleShowFilmDetail(eachFilm) {
    const sourceImg = eachFilm.src;
    const res = sourceImg.split("/");
    const linkImg = "/" + res[res.length - 1];
    let clickFilm;
    allFilm.forEach((eachCategory) => {
      eachCategory.results.forEach((eachFilm) => {
        // assume that backdrop images are always different from posters (due to what i think ))
        if (
          eachFilm.backdrop_path == linkImg ||
          eachFilm.poster_path == linkImg
        ) {
          clickFilm = eachFilm;
        }
      });
    });
    // In case have found clickedFilm:
    // set clicked
    if (isClicked.clicked === false) {
      setIsClicked({
        clicked: true,
        film: clickFilm,
      });
      setClickedFilm(clickFilm);
    } else if (isClicked.clicked === true) {
      if (isClicked.film === clickFilm || isClicked.film === "") {
        setIsClicked({
          clicked: false,
          film: "",
        });
        setClickedFilm({});
      }
      if (isClicked.film !== clickFilm) {
        setIsClicked({
          clicked: true,
          film: clickFilm,
        });
        setClickedFilm(clickFilm);
      }
    }
    console.log("isclicked:", isClicked);
    console.log("Clicked Film:", clickFilm);
  }
  // const mvDetail = isClicked ? (
  //   <MovieDetail film={clickedFilm} id={clickedFilm.id} />
  // ) : (
  //   <></>
  // );
  // after having data
  if (isLoading === false && allFilm.length > 0) {
    // set the default state of check clicked for eachFilm here (needed to be set here because the data is finally fetched here)
    // let checkClickedEachFilm = {};
    // allFilm.forEach((eachCategory, i) => {
    //   eachCategory.results.forEach((eachFilm) => {
    //     checkClickedEachFilm[eachFilm.title] = false;
    //   });
    // });
    // setIsClicked(checkClickedEachFilm);
    result = allFilm.map((eachCategory, i) => (
      <div key={eachCategory.total_pages} className="bg-black mb-[50px]">
        {/* title */}
        <div className="ml-[10px] text-white font-bold text-2xl mb-[10px]">
          {title[i]}
        </div>
        {/* image for each category */}
        <Slider className=" w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth ml-[20px]">
          {eachCategory.results.map((eachFilm) => (
            <div key={eachFilm.id} className="inline">
              {i === 0 ? (
                <img
                  src={"https://image.tmdb.org/t/p/w500" + eachFilm.poster_path}
                  className="w-[220px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300"
                  onClick={(event) => handleShowFilmDetail(event.target)}
                />
              ) : (
                <img
                  src={`${
                    eachFilm.backdrop_path &&
                    "https://image.tmdb.org/t/p/w500" + eachFilm.backdrop_path
                  }`}
                  className="w-[220px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300"
                  onClick={(event) => handleShowFilmDetail(event.target)}
                />
              )}
            </div>
          ))}
        </Slider>
        {/* If the image is clicked, show movie detail */}
        {/* {console.log(
          "Filter films: ",
          allFilm[i].results.filter((eachMV) => eachMV == clickedFilm).length >
            0
        )} */}
        {isClicked.clicked &&
          allFilm[i].results.filter((eachMV) => eachMV == clickedFilm).length >
            0 && (
            <MovieDetail
              clickedFilm={clickedFilm}
              // indexCategory={i}
              // allFilm={allFilm}
            />
          )}
      </div>
    ));
  }
  return <>{result}</>;
}
export default MovieList;
