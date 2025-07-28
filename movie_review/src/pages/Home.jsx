import { useState, useEffect } from "react";
import "../css/Home.css";
import MovieCard from "../components/MovieCard";
import MovieDetails from "../components/MovieDetails";

const API_KEY = "8c247ea0b4b56ed2ff7d41c9a833aa77";

function Home() {
  const [movies, setMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState("trending");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const sampleMovies = [
    {
      id: 1,
      title: "The Shawshank Redemption",
      poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
      release_date: "1994-09-23",
      vote_average: 9.3
    },
    {
      id: 2,
      title: "The Godfather",
      poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
      release_date: "1972-03-14",
      vote_average: 9.2
    },
    {
      id: 3,
      title: "The Dark Knight",
      poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      release_date: "2008-07-18",
      vote_average: 9.0
    },
    {
      id: 4,
      title: "Pulp Fiction",
      poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
      release_date: "1994-10-14",
      vote_average: 8.9
    },
    {
      id: 5,
      title: "Fight Club",
      poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
      release_date: "1999-10-15",
      vote_average: 8.8
    },
    {
      id: 6,
      title: "Inception",
      poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
      release_date: "2010-07-16",
      vote_average: 8.8
    }
  ];

  const fetchMovies = async (endpoint, setter) => {
    try {
      console.log(`Fetching: ${endpoint}`);
      const url = `https://api.themoviedb.org/3${endpoint}?api_key=${API_KEY}&language=en-US&page=1`;
      
      const response = await fetch(url);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`Data received for ${endpoint}:`, data);
      setter(data.results || []);
    } catch (err) {
      console.error(`Error fetching ${endpoint}:`, err);
      setter(sampleMovies);
    }
  };

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

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      setError("");
      
      try {
        await Promise.all([
          fetchMovies("/trending/movie/week", setTrending),
          fetchMovies("/movie/popular", setPopular),
          fetchMovies("/movie/top_rated", setTopRated),
          fetchMovies("/movie/upcoming", setUpcoming),
        ]);
      } catch (err) {
        console.error("Error loading initial data:", err);
        setError("Using sample data due to API connection issues.");
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const searchMovies = async (query) => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1`
      );
      
      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }
      
      const data = await response.json();
      setMovies(data.results || []);
    } catch (err) {
      console.error("Search error:", err);
      setError("Search failed. Please try again.");
      const filtered = sampleMovies.filter(movie => 
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      setMovies(filtered);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchMovies(searchTerm);
  };

  const handleViewDetails = async (movie) => {
    setSelectedMovie(movie);
    await fetchMovieDetails(movie.id);
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
    setMovieDetails(null);
  };

  const getActiveMovies = () => {
    if (searchTerm.trim()) return movies;
    
    switch (activeSection) {
      case "trending": return trending;
      case "popular": return popular;
      case "topRated": return topRated;
      case "upcoming": return upcoming;
      default: return trending;
    }
  };

  const getSectionTitle = () => {
    if (searchTerm.trim()) return `Search Results for "${searchTerm}"`;
    
    switch (activeSection) {
      case "trending": return "Trending This Week";
      case "popular": return "Most Popular";
      case "topRated": return "Top Rated";
      case "upcoming": return "Coming Soon";
      default: return "Trending This Week";
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {!searchTerm.trim() && (
        <div className="category-nav">
          <button
            className={`category-btn ${activeSection === "trending" ? "active" : ""}`}
            onClick={() => setActiveSection("trending")}
          >
            Trending
          </button>
          <button
            className={`category-btn ${activeSection === "popular" ? "active" : ""}`}
            onClick={() => setActiveSection("popular")}
          >
            Popular
          </button>
          <button
            className={`category-btn ${activeSection === "topRated" ? "active" : ""}`}
            onClick={() => setActiveSection("topRated")}
          >
            Top Rated
          </button>
          <button
            className={`category-btn ${activeSection === "upcoming" ? "active" : ""}`}
            onClick={() => setActiveSection("upcoming")}
          >
            Coming Soon
          </button>
        </div>
      )}

      <h2 className="section-title">{getSectionTitle()}</h2>

      {error && <div className="error-message">{error}</div>}

      {loading && (
        <div className="loading">
          <div className="loading-spinner"></div>
          Loading movies...
        </div>
      )}

      {!loading && (
        <div className="movies-grid">
          {getActiveMovies().map((movie) => (
            <MovieCard 
              movie={movie} 
              key={movie.id} 
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}

      {!loading && !error && getActiveMovies().length === 0 && searchTerm.trim() && (
        <div className="no-results">
          <h3>No movies found</h3>
          <p>Try searching for a different movie title.</p>
        </div>
      )}

      {!searchTerm.trim() && !loading && (
        <div className="quick-stats">
          <div className="stat-card">
            <span className="stat-number">{trending.length}</span>
            <span className="stat-label">Trending</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{popular.length}</span>
            <span className="stat-label">Popular</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{topRated.length}</span>
            <span className="stat-label">Top Rated</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{upcoming.length}</span>
            <span className="stat-label">Coming Soon</span>
          </div>
        </div>
      )}

      {selectedMovie && movieDetails && (
        <MovieDetails 
          movie={movieDetails} 
          onClose={handleCloseDetails}
        />
      )}

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

export default Home;