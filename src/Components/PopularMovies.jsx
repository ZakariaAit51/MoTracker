import React from 'react';

function PopularMovies({ data }) {
  console.log(data);
  return (
    <div className="bg-base-200">
      <h1 className="text-3xl mb-6">Popular Movies</h1>
      <div className="carousel w-full space-x-4 p-4 bg-neutral rounded-md " style={{scrollSnapType:'none'}}>
        {data.map((result, index) => (
          <div
            key={index}
            className="carousel-item w-96 flex-shrink-0 card card-compact bg-base-100 shadow-xl"
          >
            <figure>
              <img
                src={`https://image.tmdb.org/t/p/w500${result.backdrop_path}`}
                alt={result.title}
                className="object-cover h-64 w-full rounded-t-lg"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{result.title}</h2>
              <p className="line-clamp-2 text-ellipsis">{result.overview}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">More Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularMovies;
