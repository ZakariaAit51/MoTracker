import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PopularMovies from './Components/PopularMovies';
import Hero from './Components/Hero';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const tmdbAuthorizationToken = import.meta.env.VITE_TMDB_AUTHORIZATION;
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
  const options = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${tmdbAuthorizationToken}`,
    },
  };

  const fetchImage = async (id, backdropPath) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/images`,
        options
      );
      return response.data.backdrops
        .filter((image) => image.file_path !== backdropPath && image.iso_639_1 === null)
        .sort((a, b) => b.vote_average - a.vote_average) 
        .slice(0, 5);
    } catch (error) {
      setError(error.message);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, options);
        const movies = response.data.results;

        // Fetch images for each movie
        const moviesWithImages = await Promise.all(
          movies.map(async (movie) => {
            const images = await fetchImage(movie.id,movie.backdrop_path);
            return { ...movie, images }; // Return movie object with images
          })
        );

        setData({ ...response.data, results: moviesWithImages });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [tmdbAuthorizationToken]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <main className="p-2">
      <Hero data={data.results} />
    </main>
  );
}

export default App;
