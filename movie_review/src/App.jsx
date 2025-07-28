import "./css/App.css";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { Routes, Route, Navigate } from "react-router-dom";
import { MovieProvider } from "./context/MovieContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <MovieProvider>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/favorites" element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            } />
            {/* Catch all route - redirect to auth */}
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </Routes>
        </main>
      </MovieProvider>
    </AuthProvider>
  );
}

export default App;