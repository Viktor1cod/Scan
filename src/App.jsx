import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import WhyUs from "./components/WhyUs";
import Tariffs from "./components/Tariffs";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import SearchPage from "./pages/SearchPage";

function HomePage() {
  const currentPlan = "Beginner";

  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhyUs />
        <Tariffs currentPlan={currentPlan} />
      </main>
      <Footer />
    </>
  );
}

function App() {
  const { isAuth } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/login"
        element={isAuth ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/search"
        element={isAuth ? <SearchPage /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default App;
