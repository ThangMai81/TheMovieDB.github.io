const API_KEY = "a4258e55176335f7733ec45d8d51977a";
const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
};
const lengthRequests = Object.values(requests).length;
console.log("lengthRequests: ", lengthRequests);
const requestURL = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`;
const eachRequest = `https://api.themoviedb.org/3`;
export function getFetchData() {
  let array = [];
  return new Promise((resolve) => {
    try {
      Object.values(requests).forEach(async (eachLink, i) => {
        const eachResponse = await fetch(eachRequest + eachLink);
        const data = await eachResponse.json();
        array.push(data);
        // console.log(array);
        // console.log(i);
        if (i === lengthRequests - 1) {
          resolve(array);
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  });
}
export async function getMovieDetail(movie_id) {
  const movieURL = `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${API_KEY}`;
  try {
    const response = await fetch(movieURL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function getSearchMovie(nameFilm) {
  const words = nameFilm.split(" ");
  let name = "";
  words.forEach((eachWord, i) => {
    name += eachWord;
    if (i !== words.length - 1) name += "+";
  });
  const searchURL = `https://api.themoviedb.org/3/search/movie?query=${words}&api_key=${API_KEY}`;
  try {
    const response = await fetch(searchURL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
