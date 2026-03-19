import "./Hero.css";

function Hero() {
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

          <button className="hero__button">Запросить данные</button>
        </div>

        <div className="hero__image">
          <div className="hero__image-box">Иллюстрация</div>
        </div>
      </div>
    </section>
  );
}

export default Hero;