import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import WhyUs from "./components/WhyUs";
import Tariffs from "./components/Tariffs";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import SearchPage from "./pages/SearchPage";

function HomePage({ isAuth, onLogout }) {
  const currentPlan = "Beginner";

  return (
    <>
      <Header isAuth={isAuth} onLogout={onLogout} />
      <main>
        <Hero isAuth={isAuth} />
        <WhyUs />
        <Tariffs isAuth={isAuth} currentPlan={currentPlan} />
      </main>
      <Footer />
    </>
  );
}

function App() {
  const [isAuth, setIsAuth] = useState(true);

  const handleLogin = () => setIsAuth(true);
  const handleLogout = () => setIsAuth(false);

  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage isAuth={isAuth} onLogout={handleLogout} />}
      />
      <Route
        path="/login"
        element={
          isAuth ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
        }
      />
      <Route
        path="/search"
        element={
          isAuth ? <SearchPage isAuth={isAuth} /> : <Navigate to="/login" replace />
        }
      />
    </Routes>
  );
}

export default App;