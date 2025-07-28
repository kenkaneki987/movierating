import { useEffect } from 'react';
import '../css/MovieDetails.css';

function MovieDetails({ movie, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!movie) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'Release date unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatRating = (rating) => {
    return rating ? `${rating.toFixed(1)}/10` : 'No rating';
  };

  return (
    <div className="movie-details-overlay" onClick={onClose}>
      <div className="movie-details-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
        
        <div className="movie-details-content">
          <div className="movie-poster-section">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster-large"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x450/666/fff?text=No+Image';
              }}
            />
          </div>
          
          <div className="movie-info-section">
            <h2 className="movie-title">{movie.title}</h2>
            
            <div className="movie-meta">
              <span className="movie-year">
                {movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown'}
              </span>
              {movie.runtime && (
                <span className="movie-runtime">
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </span>
              )}
              {movie.vote_average && (
                <span className="movie-rating">
                  ⭐ {formatRating(movie.vote_average)}
                </span>
              )}
            </div>
            
            {movie.genres && movie.genres.length > 0 && (
              <div className="movie-genres">
                {movie.genres.map(genre => (
                  <span key={genre.id} className="genre-tag">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
            
            <div className="movie-overview">
              <h3>Overview</h3>
              <p>{movie.overview || 'No overview available.'}</p>
            </div>
            
            <div className="movie-details-grid">
              <div className="detail-item">
                <span className="detail-label">Release Date:</span>
                <span className="detail-value">{formatDate(movie.release_date)}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Rating:</span>
                <span className="detail-value">{formatRating(movie.vote_average)}</span>
              </div>
              
              {movie.vote_count && (
                <div className="detail-item">
                  <span className="detail-label">Vote Count:</span>
                  <span className="detail-value">{movie.vote_count.toLocaleString()}</span>
                </div>
              )}
              
              {movie.original_language && (
                <div className="detail-item">
                  <span className="detail-label">Language:</span>
                  <span className="detail-value">{movie.original_language.toUpperCase()}</span>
                </div>
              )}
              
              {movie.budget && movie.budget > 0 && (
                <div className="detail-item">
                  <span className="detail-label">Budget:</span>
                  <span className="detail-value">
                    ${(movie.budget / 1000000).toFixed(1)}M
                  </span>
                </div>
              )}
              
              {movie.revenue && movie.revenue > 0 && (
                <div className="detail-item">
                  <span className="detail-label">Revenue:</span>
                  <span className="detail-value">
                    ${(movie.revenue / 1000000).toFixed(1)}M
                  </span>
                </div>
              )}
            </div>
            
            {movie.tagline && (
              <div className="movie-tagline">
                <em>"{movie.tagline}"</em>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails; 