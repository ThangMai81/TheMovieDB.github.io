function Banner({ isLoading, randomFilm, error }) {
  let result;
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
  // if fetching data is done...
  if (isLoading === false && randomFilm != {}) {
    result = (
      <>
        <img
          className="w-full h-auto"
          src={`${
            randomFilm.backdrop_path &&
            "https://image.tmdb.org/t/p/w500/" + randomFilm.backdrop_path
          }`}
        />
        <div className="absolute left-5 top-36 font-bold font-sans text-4xl text-white">
          {randomFilm.original_title}
        </div>
        {/* Button Play and Mylist */}
        <div className="absolute left-5 top-52 font-sm font-sans text-xl text-white">
          <button
            type="button"
            className="mr-5 bg-gray-500 w-24 h-10  rounded-md hover:bg-gray-300"
          >
            Play
          </button>
          <button
            type="button"
            className="mr-5 bg-gray-500 w-32 h-10  rounded-md hover:bg-gray-300"
          >
            My List
          </button>
        </div>
        <div className="absolute left-5 top-64 w-72 font-semibold font-sans text-sm text-white">
          {randomFilm.overview}
        </div>
      </>
    );
  }
  return <div className="mb-[50px]">{result}</div>;
}
export default Banner;
