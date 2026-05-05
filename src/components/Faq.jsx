import { useState } from "react";
import "./Faq.css";

const questions = [
  {
    question: "Как найти публикации о компании?",
    answer:
      "Перейдите на страницу поиска, введите ИНН компании из 10 цифр, укажите диапазон дат и количество документов. После этого нажмите кнопку «Поиск» — система найдёт все публикации за выбранный период.",
  },
  {
    question: "Что такое ИНН и где его найти?",
    answer:
      "ИНН (Идентификационный номер налогоплательщика) — уникальный 10-значный код компании. Его можно найти на сайте ФНС, в официальных документах компании или в открытых реестрах юридических лиц.",
  },
  {
    question: "Какие источники используются для поиска?",
    answer:
      "Система анализирует публикации из крупнейших российских деловых изданий: РБК, Ведомости, Forbes, Коммерсантъ, VC.ru, Habr и других. Всего более 500 источников.",
  },
  {
    question: "Можно ли экспортировать результаты?",
    answer:
      "Да, экспорт истории доступен на тарифах Pro и Business. Результаты можно сохранить в формате PDF и получить на электронную почту.",
  },
  {
    question: "Как изменить тарифный план?",
    answer:
      "Перейдите в личный кабинет и выберите подходящий тариф. Смена тарифа происходит мгновенно, остаток по текущему тарифу пересчитывается автоматически.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="faq" id="faq">
      <div className="container">
        <h2 className="faq__title">ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ</h2>
        <div className="faq__list">
          {questions.map((item, i) => (
            <div
              key={i}
              className={`faq__item ${openIndex === i ? "faq__item--open" : ""}`}
            >
              <button className="faq__question" onClick={() => toggle(i)}>
                <span>{item.question}</span>
                <span className="faq__icon">{openIndex === i ? "−" : "+"}</span>
              </button>
              {openIndex === i && (
                <p className="faq__answer">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
