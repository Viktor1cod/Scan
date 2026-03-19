import "./Tariffs.css";

const tariffs = [
  {
    name: "Beginner",
    subtitle: "Для небольшого исследования",
    price: "799 ₽",
    oldPrice: "1 200 ₽",
    installment: "или 150 ₽/мес. при рассрочке на 24 мес.",
    features: [
      "Безлимитная история запросов",
      "Безопасная сделка",
      "Поддержка 24/7",
    ],
    color: "tariff-card--orange",
    current: true,
  },
  {
    name: "Pro",
    subtitle: "Для ИП и фрилансеров",
    price: "1 299 ₽",
    oldPrice: "2 600 ₽",
    installment: "или 279 ₽/мес. при рассрочке на 24 мес.",
    features: [
      "Все пункты тарифа Beginner",
      "Экспорт истории",
      "Рекомендации по приоритетам",
    ],
    color: "tariff-card--green",
    current: false,
  },
  {
    name: "Business",
    subtitle: "Для корпоративных клиентов",
    price: "2 379 ₽",
    oldPrice: "3 700 ₽",
    installment: "",
    features: [
      "Все пункты тарифа Pro",
      "Безлимитное количество запросов",
      "Приоритетная поддержка",
    ],
    color: "tariff-card--black",
    current: false,
  },
];

function Tariffs() {
  return (
    <section className="tariffs" id="tariffs">
      <div className="container">
        <h2 className="tariffs__title">НАШИ ТАРИФЫ</h2>

        <div className="tariffs__grid">
          {tariffs.map((tariff, index) => (
            <div className="tariff-card" key={index}>
              <div className={`tariff-card__top ${tariff.color}`}>
                <h3>{tariff.name}</h3>
                <p>{tariff.subtitle}</p>
              </div>

              <div className="tariff-card__body">
                <div className="tariff-card__price-row">
                  <span className="tariff-card__price">{tariff.price}</span>
                  <span className="tariff-card__old-price">{tariff.oldPrice}</span>
                </div>

                {tariff.installment && (
                  <p className="tariff-card__installment">{tariff.installment}</p>
                )}

                <div className="tariff-card__features">
                  <p>В тариф входит:</p>
                  <ul>
                    {tariff.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <button className={tariff.current ? "btn-gray" : "btn-blue"}>
                  {tariff.current ? "Перейти в личный кабинет" : "Подробнее"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Tariffs;