import Header from "./components/Header";
import Hero from "./components/Hero";
import WhyUs from "./components/WhyUs";
import Tariffs from "./components/Tariffs";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhyUs />
        <Tariffs />
      </main>
      <Footer />
    </>
  );
}

export default App;