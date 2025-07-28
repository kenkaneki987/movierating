import { useMovieContext } from "../context/MovieContext";
import { useAuth } from "../context/AuthContext";
import "../css/MovieCard.css";

function MovieCard({ movie, onViewDetails }) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
  const { user } = useAuth();

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (!user) return;
    
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(movie);
    }
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    if (onViewDetails) {
      onViewDetails(movie);
    }
  };

  return (
    <div className="movie-card" onClick={handleCardClick}>
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x450/666/fff?text=No+Image';
          }}
        />
        
        <div className="movie-overlay">
          <button
            onClick={handleFavoriteClick}
            className={`favorite-btn ${isFavorite(movie.id) ? "active" : ""}`}
            title={isFavorite(movie.id) ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite(movie.id) ? "❤️" : "🤍"}
          </button>
          
          <button
            onClick={handleViewDetails}
            className="view-details-btn"
            title="View details"
          >
            👁️ View Details
          </button>
        </div>
      </div>
      
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown'}</p>
        {movie.vote_average && (
          <p className="movie-rating">⭐ {movie.vote_average.toFixed(1)}/10</p>
        )}
      </div>
    </div>
  );
}

export default MovieCard;