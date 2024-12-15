import React, {useState} from 'react'
import genre_data from '../assets/genre_id/movie.json'
import axios from 'axios';


const Hero = ({ data }) => {

    const handleGenreName = (genreIds) => {
        return genreIds.map((genreId) => {
            const genre = genre_data.genres.find((genre) => genre.id === genreId);
            return genre ? genre.name : 'Unknown Genre';
        });
    }
    console.log(data);
    const handleRating = (rating) => { 
        if (rating >= 8) {
            return { text: 'Excellent', color: '#4CAF50' }; // Green
        } else if (rating >= 6) {
            return { text: 'Good', color: '#8BC34A' };      // Light Green
        } else if (rating >= 4) {
            return { text: 'Average', color: '#FFC107' };   // Amber
        } else if (rating >= 2) {
            return { text: 'Poor', color: '#FF9800' };      // Orange
        } else {
            return { text: 'Terrible', color: '#F44336' };   // Red
        }
    };



    return (
        <div className="carousel w-full" style={{ height: '400px' }}>
            {data.forEach((result, index) => (
                
                <div key={index} id={`slide${index + 1}`} className="carousel-item relative w-full h-full">
                    <div className="flex flex-row w-full gap-2">
                        <div
                            style={{backgroundSize: 'cover',height:'100%',backgroundImage: `url(https://image.tmdb.org/t/p/w500${result.backdrop_path})` }}
                            className="flex-auto w-64 rounded-box"
                        >
                        </div>
                        <div className="flex flex-col flex-auto w-32 gap-2">
                            <div className='p-4 bg-base-300 border-base-300 border rounded-box'>
                                <h1 className='text-3xl text-white'>{result.title}</h1>
                                <div className='py-2'>
                                    {
                                        handleGenreName(result.genre_ids).map((genre, index) => (
                                            <div key={index} className="badge badge-primary mx-2 text-white">{genre}</div>
                                        ))
                                    }
                                </div>
                                <div className="flex flex-row gap-2">
                                    <div className='flex-auto w-76 rounded-box border border-base-200 w-fit flex flex-row gap-2 p-2 items-center'>
                                        <div className='p-4 rounded-box' style={{ backgroundColor: handleRating(result.vote_average).color }}>
                                            <img height="35" width="35" src={`../src/assets/rating_icons/${handleRating(result.vote_average).text}.svg`} alt={handleRating(result.vote_average)} /> 
                                        </div>
                                        <span className="capitalize">{handleRating(result.vote_average).text}</span>
                                    </div>
                                    <button className="flex-auto rounded-box w-24 bg-primary text-white">More</button>
                                </div>
                            </div>
                            <div className="flex flex-row">
                                {
                                    console.log(result)
                                }{console.log(result.images)
                                }
                            </div>
                        </div>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        {index > 0 && (
                            <a href={`#slide${index}`} className="btn btn-circle">
                                ❮
                            </a>
                        )}
                        {index < data.length - 1 && (
                            <a href={`#slide${index + 2}`} className="btn btn-circle">
                                ❯
                            </a>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Hero;