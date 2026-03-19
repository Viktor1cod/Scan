import "./WhyUs.css";

const features = [
  {
    title: "Высокая и оперативная скорость обработки заявки",
    text: "Быстро отправляем запрос и показываем статус обработки в личном кабинете.",
  },
  {
    title: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос",
    text: "Используем открытые источники, СМИ и базы данных для анализа.",
  },
  {
    title: "Защита конфиденциальных сведений, не подлежащих разглашению по федеральному законодательству",
    text: "Работаем с безопасным хранением информации и разграничением доступа.",
  },
];

function WhyUs() {
  return (
    <section className="why-us">
      <div className="container">
        <h2 className="why-us__title">ПОЧЕМУ ИМЕННО МЫ</h2>

        <div className="why-us__cards">
          {features.map((item, index) => (
            <div className="why-us__card" key={index}>
              <div className="why-us__icon">✓</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        <div className="why-us__illustration">
          Большая декоративная иллюстрация
        </div>
      </div>
    </section>
  );
}

export default WhyUs;