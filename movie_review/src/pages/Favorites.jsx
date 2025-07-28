import "../css/Favorites.css"
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import MovieDetails from "../components/MovieDetails";
import { useState } from "react";

function Favorites(){
    const { favorites, loading } = useMovieContext();
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [movieDetails, setMovieDetails] = useState(null);
    const [loadingDetails, setLoadingDetails] = useState(false);

    const API_KEY = "1b7c076a0e4849aeefd1f3c429c79d1";

    // Fetch detailed movie information
    const fetchMovieDetails = async (movieId) => {
        setLoadingDetails(true);
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=credits,videos,images`
            );
            const data = await response.json();
            setMovieDetails(data);
        } catch (err) {
            console.error('Error fetching movie details:', err);
        } finally {
            setLoadingDetails(false);
        }
    };

    const handleViewDetails = async (movie) => {
        setSelectedMovie(movie);
        await fetchMovieDetails(movie.id);
    };

    const handleCloseDetails = () => {
        setSelectedMovie(null);
        setMovieDetails(null);
    };
    
    if (loading) {
      return (
        <div className="loading-container">
          <div className="loading">Loading favorites...</div>
        </div>
      );
    }

    if (favorites && favorites.length > 0) {
      return (
        <div className="favorites">
          <h2>Your Favorites</h2>
          <div className="movies-grid">
            {favorites.map((movie) => (
              <MovieCard 
                movie={movie} 
                key={movie.id} 
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>

          {/* Movie Details Modal */}
          {selectedMovie && movieDetails && (
            <MovieDetails 
              movie={movieDetails} 
              onClose={handleCloseDetails}
            />
          )}

          {/* Loading Details Modal */}
          {selectedMovie && loadingDetails && (
            <div className="movie-details-overlay">
              <div className="movie-details-modal">
                <div className="loading">
                  <div className="loading-spinner"></div>
                  Loading movie details...
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
  
    return (
      <div className="favorites-empty">
        <h2>No Favorite Movies Yet</h2>
        <p>Start adding movies to your favorites and they will appear here!</p>
      </div>
    );
  }
export default Favorites;