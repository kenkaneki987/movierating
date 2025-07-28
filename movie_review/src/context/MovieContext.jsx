import { createContext, useState, useContext, useEffect } from "react"
import { useAuth } from "./AuthContext"

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([])
    const [loading, setLoading] = useState(true)
    const { user, loading: authLoading } = useAuth()

    // Load favorites when user changes or on initial load
    useEffect(() => {
        if (!authLoading) {
            if (user) {
                const userFavoritesKey = `favorites_${user.uid}`
                console.log('Loading favorites for user:', user.uid)
                const storedFavs = localStorage.getItem(userFavoritesKey)
                if (storedFavs) {
                    const parsedFavs = JSON.parse(storedFavs)
                    console.log('Loaded favorites:', parsedFavs)
                    setFavorites(parsedFavs)
                } else {
                    console.log('No stored favorites found')
                    setFavorites([])
                }
            } else {
                console.log('No user, clearing favorites')
                setFavorites([])
            }
            setLoading(false)
        }
    }, [user, authLoading])

    // Save favorites to localStorage whenever favorites or user changes
    useEffect(() => {
        if (user && !loading) {
            const userFavoritesKey = `favorites_${user.uid}`
            console.log('Saving favorites for user:', user.uid, favorites)
            localStorage.setItem(userFavoritesKey, JSON.stringify(favorites))
        }
    }, [favorites, user, loading])

    const addToFavorites = (movie) => {
        if (!user) return // Don't add favorites if user is not authenticated
        console.log('Adding to favorites:', movie.title)
        setFavorites(prev => {
            // Check if movie is already in favorites
            if (prev.some(fav => fav.id === movie.id)) {
                return prev
            }
            return [...prev, movie]
        })
    }

    const removeFromFavorites = (movieId) => {
        if (!user) return // Don't remove favorites if user is not authenticated
        console.log('Removing from favorites:', movieId)
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }
    
    const isFavorite = (movieId) => {
        if (!user) return false // Not favorite if user is not authenticated
        return favorites.some(movie => movie.id === movieId)
    }

    const value = {
        favorites,
        loading,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}