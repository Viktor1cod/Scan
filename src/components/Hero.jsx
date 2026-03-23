import { Link } from "react-router-dom";
import "./Hero.css";
import heroImg from "../assets/images/hero.png";

function Hero({ isAuth }) {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <h1 className="hero__title">
            СЕРВИС ПО ПОИСКУ ПУБЛИКАЦИЙ О КОМПАНИИ ПО ЕГО ИНН
          </h1>

          <p className="hero__text">
            Комплексный анализ публикаций, получение данных в формате PDF
            на электронную почту.
          </p>

          {isAuth && (
            <Link to="/search" className="hero__button">
              Запросить данные
            </Link>
          )}
        </div>

        <div className="hero__image">
          <img src={heroImg} alt="Анализ компании" className="hero__img" />
        </div>
      </div>
    </section>
  );
}

export default Hero;