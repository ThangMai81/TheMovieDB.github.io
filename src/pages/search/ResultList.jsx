function ResultList({ allFilm, isLoading, isError }) {
  const sideEff = "text-white font-bold font-sans text-lg absolute left-50";
  // if some error is happening...
  if (isError === true) {
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
    console.log("Fetching data...");
    return (
      <div className="relative w-full">
        <span className={sideEff}>Fetching data...</span>;
      </div>
    );
  }
  let result = <></>;
  if (isLoading === false && Object.values(allFilm).length > 0) {
    result = allFilm.results.map((eachFilm) => (
      <img
        key={eachFilm.id}
        src={`https://image.tmdb.org/t/p/w500/${eachFilm.poster_path}`}
        className="inline-block max-w-[220px] hover:scale-105 duration-300 mr-[10px]"
      />
    ));
  }
  return (
    <>
      <div className="font-bold text-xl text-white absolute top-[400px] left-[50px]">
        <span className="">Search Results</span>
      </div>
      <div className="absolute top-[500px] left-[50px] grid grid-cols-6">
        {result}
      </div>
    </>
  );
}
export default ResultList;
