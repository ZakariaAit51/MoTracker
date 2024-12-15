import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PopularMovies from './Components/PopularMovies';
import Hero from './Components/Hero';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [error, setError] = useState(null);
  const tmdbAuthorizationToken = import.meta.env.VITE_TMDB_AUTHORIZATION; // get the Authorization token from the environment variable
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
  const options = { // make a GET request to the API
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${tmdbAuthorizationToken}`,
    },
  }
  const fetchImage = async (id) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/images`, options);
      data.results.forEach((result)=>{
          if(result.id === id){
          result['images'] = response.data.backdrops.sort((a, b) => b.vote_average - a.vote_average).slice(0, 5);          }
      })
    } catch (error) {
      setError(error.message);
    }
  }
  useEffect(() => {
    const fetchData = async () => { // fetch data from the API
      try {
        const response = await axios.get(url, options);
        setData(response.data); // Set data to response.data instead of response
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData(); // call the function

  }, [tmdbAuthorizationToken]); // re-run the effect if the API key changes
  if (data) {
    console.log('worked');
    data.results.forEach((dataItem) => fetchImage(dataItem.id));
    console.log(data.results[0].images);
  }
// data.results.map((dataItem)=>(fetchImage(dataItem.id)))    

  
  if (error) {
    // If there is an error, display it
    return <div>Error: {error}</div>;
  }

  if (!data) {
    // If there is no data, display a loading message
    return <div>Loading...</div>;
  }

  return (
  <main className='p-2'>
    {/* <PopularMovies data={data.results}/> */}
    <Hero data={data.results} />
  </main>
  );
}
export default App;
