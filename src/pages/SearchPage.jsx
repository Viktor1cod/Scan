import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./SearchPage.css";
import searchImg from "../assets/images/search-illustration.png";
import preview1 from "../assets/images/document-preview-1.png";
import preview2 from "../assets/images/document-preview-2.png";

function SearchPage() {
  const [formData, setFormData] = useState({
    inn: "",
    tone: "Любая",
    docsCount: "",
    dateFrom: "",
    dateTo: "",
    maxFullness: false,
    businessContext: false,
    mainRole: false,
    riskFactors: false,
    techNews: false,
    announcements: false,
    newsSummary: false,
  });

  const [errors, setErrors] = useState({
    inn: "",
    docsCount: "",
    dateFrom: "",
    dateTo: "",
  });

  const [isResultsLoading, setIsResultsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [histograms, setHistograms] = useState([]);
  const [allDocuments, setAllDocuments] = useState([]);
  const [visibleDocuments, setVisibleDocuments] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name in errors) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateInn = (inn) => {
    if (!inn.trim()) return "Обязательное поле";
    if (!/^\d+$/.test(inn)) return "Введите корректные данные";
    if (inn.length !== 10) return "Введите корректные данные";
    return "";
  };

  const validateDocsCount = (value) => {
    if (!value.trim()) return "Обязательное поле";
    const num = Number(value);
    if (!Number.isInteger(num) || num < 1 || num > 1000) {
      return "Введите число от 1 до 1000";
    }
    return "";
  };

  const validateDates = (dateFrom, dateTo) => {
    const nextErrors = {
      dateFrom: "",
      dateTo: "",
    };

    if (!dateFrom) nextErrors.dateFrom = "Обязательное поле";
    if (!dateTo) nextErrors.dateTo = "Обязательное поле";

    if (dateFrom && dateTo && new Date(dateFrom) > new Date(dateTo)) {
      nextErrors.dateFrom = "Дата начала не может быть позже даты конца";
      nextErrors.dateTo = "Дата конца должна быть раньше даты начала";
    }

    return nextErrors;
  };

  const isFormValid = useMemo(() => {
    const innError = validateInn(formData.inn);
    const docsError = validateDocsCount(formData.docsCount);
    const dateErrors = validateDates(formData.dateFrom, formData.dateTo);

    return !innError && !docsError && !dateErrors.dateFrom && !dateErrors.dateTo;
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const innError = validateInn(formData.inn);
    const docsError = validateDocsCount(formData.docsCount);
    const dateErrors = validateDates(formData.dateFrom, formData.dateTo);

    const nextErrors = {
      inn: innError,
      docsCount: docsError,
      dateFrom: dateErrors.dateFrom,
      dateTo: dateErrors.dateTo,
    };

    setErrors(nextErrors);

    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) return;

    setShowResults(true);
    setIsResultsLoading(true);

    setTimeout(() => {
      const mockHistograms = [
        { period: "01.01.2024", total: 5, risks: 1 },
        { period: "01.02.2024", total: 8, risks: 2 },
        { period: "01.03.2024", total: 3, risks: 0 },
        { period: "01.04.2024", total: 10, risks: 4 },
        { period: "01.05.2024", total: 7, risks: 1 },
        { period: "01.06.2024", total: 6, risks: 2 },
      ];

      const mockDocuments = [
        {
          id: 1,
          date: "13.09.2021",
          source: "Комсомольская правда",
          url: "#",
          title: "Скиллфэктори — лучшая онлайн-школа для будущих айтишников",
          text: "Skillfactory — образовательная платформа, которая предлагает курсы по программированию, аналитике и Data Science. Платформа помогает студентам быстро войти в IT-сферу.",
          image: preview1,
          wordCount: 811,
          attributes: {
            isTechNews: false,
            isAnnouncement: true,
            isDigest: false,
          },
        },
        {
          id: 2,
          date: "15.09.2021",
          source: "VC.ru",
          url: "#",
          title: "Работа в Data Science в 2024 году: тренды, навыки и вакансии",
          text: "Спрос на специалистов по данным продолжает расти. Компании ищут аналитиков, ML-инженеров и специалистов по BI, которые умеют работать с большими данными.",
          image: preview2,
          wordCount: 940,
          attributes: {
            isTechNews: true,
            isAnnouncement: false,
            isDigest: false,
          },
        },
        {
          id: 3,
          date: "20.09.2021",
          source: "РБК",
          url: "#",
          title: "Рынок EdTech растет: обзор главных событий недели",
          text: "Российский рынок онлайн-образования показывает стабильный рост. Игроки запускают новые программы, усиливают маркетинг и расширяют продуктовые линейки.",
          image: preview1,
          wordCount: 670,
          attributes: {
            isTechNews: false,
            isAnnouncement: false,
            isDigest: true,
          },
        },
        {
          id: 4,
          date: "25.09.2021",
          source: "Forbes",
          url: "#",
          title: "Какие навыки нужны разработчику в 2024 году",
          text: "Компании все чаще ждут от разработчиков не только хорошего знания языка, но и понимания процессов, командной работы и продуктового подхода.",
          image: preview2,
          wordCount: 720,
          attributes: {
            isTechNews: true,
            isAnnouncement: false,
            isDigest: false,
          },
        },
        {
          id: 5,
          date: "01.10.2021",
          source: "Habr",
          url: "#",
          title: "Тренды фронтенда: что изучать начинающему разработчику",
          text: "React, TypeScript, архитектура приложений и работа с API остаются важными направлениями для изучения. Также растет важность тестирования и accessibility.",
          image: preview1,
          wordCount: 530,
          attributes: {
            isTechNews: true,
            isAnnouncement: false,
            isDigest: false,
          },
        },
        {
          id: 6,
          date: "04.10.2021",
          source: "TAdviser",
          url: "#",
          title: "Обзор корпоративного обучения в IT-компаниях",
          text: "Компании вкладываются в обучение сотрудников, чтобы быстрее закрывать дефицит специалистов и усиливать внутреннюю экспертизу.",
          image: preview2,
          wordCount: 490,
          attributes: {
            isTechNews: false,
            isAnnouncement: false,
            isDigest: true,
          },
        },
        {
          id: 7,
          date: "07.10.2021",
          source: "CNews",
          url: "#",
          title: "Новые программы подготовки аналитиков данных",
          text: "Образовательные платформы и вузы обновляют курсы, добавляя больше практики, кейсов и командной работы над реальными задачами.",
          image: preview1,
          wordCount: 610,
          attributes: {
            isTechNews: false,
            isAnnouncement: true,
            isDigest: false,
          },
        },
        {
          id: 8,
          date: "10.10.2021",
          source: "Известия",
          url: "#",
          title: "Как меняется рынок онлайн-образования",
          text: "Пользователи ожидают более персонализированный подход, удобные интерфейсы и понятную карьерную траекторию после завершения обучения.",
          image: preview2,
          wordCount: 580,
          attributes: {
            isTechNews: false,
            isAnnouncement: false,
            isDigest: true,
          },
        },
        {
          id: 9,
          date: "12.10.2021",
          source: "РИА Новости",
          url: "#",
          title: "Почему компании активнее ищут junior-специалистов",
          text: "Бизнес начинает чаще брать джуниоров и доучивать их внутри компании, особенно если у кандидата есть хорошая база и мотивация.",
          image: preview1,
          wordCount: 450,
          attributes: {
            isTechNews: false,
            isAnnouncement: false,
            isDigest: false,
          },
        },
        {
          id: 10,
          date: "15.10.2021",
          source: "Ведомости",
          url: "#",
          title: "Что влияет на выбор онлайн-школы",
          text: "Пользователи обращают внимание на программу, преподавателей, практические задания, карьерную поддержку и отзывы выпускников.",
          image: preview2,
          wordCount: 520,
          attributes: {
            isTechNews: false,
            isAnnouncement: true,
            isDigest: false,
          },
        },
        {
          id: 11,
          date: "18.10.2021",
          source: "Lenta.ru",
          url: "#",
          title: "Компании расширяют найм в digital и IT",
          text: "На фоне цифровизации растет спрос на разработчиков, аналитиков, тестировщиков и менеджеров цифровых продуктов.",
          image: preview1,
          wordCount: 700,
          attributes: {
            isTechNews: true,
            isAnnouncement: false,
            isDigest: false,
          },
        },
        {
          id: 12,
          date: "21.10.2021",
          source: "ТАСС",
          url: "#",
          title: "Главные новости индустрии за неделю",
          text: "Собрали краткий обзор событий на рынке технологий, онлайн-образования и цифровых профессий за последние дни.",
          image: preview2,
          wordCount: 640,
          attributes: {
            isTechNews: false,
            isAnnouncement: false,
            isDigest: true,
          },
        },
      ];

      setHistograms(mockHistograms);
      setAllDocuments(mockDocuments);
      setVisibleCount(10);
      setVisibleDocuments(mockDocuments.slice(0, 10));
      setIsResultsLoading(false);
    }, 1200);
  };

  const handleShowMore = () => {
    const nextCount = visibleCount + 10;
    setVisibleCount(nextCount);
    setVisibleDocuments(allDocuments.slice(0, nextCount));
  };

  const renderTags = (attributes) => {
    const tags = [];

    if (attributes.isTechNews) {
      tags.push(
        <span key="tech" className="doc-card__tag doc-card__tag--yellow">
          Технические новости
        </span>
      );
    }

    if (attributes.isAnnouncement) {
      tags.push(
        <span key="announcement" className="doc-card__tag doc-card__tag--green">
          Анонсы и события
        </span>
      );
    }

    if (attributes.isDigest) {
      tags.push(
        <span key="digest" className="doc-card__tag doc-card__tag--orange">
          Сводки новостей
        </span>
      );
    }

    return tags;
  };

  return (
    <div className="search-page">
      <header className="search-header">
        <div className="container search-header__inner">
          <div className="search-header__logo">СКАН</div>

          <nav className="search-header__nav">
            <Link to="/">Главная</Link>
            <a href="#tariffs">Тарифы</a>
            <a href="#faq">FAQ</a>
          </nav>

          <div className="search-header__auth">
            <div className="search-header__stats">
              <div>
                Использовано компаний <b>34</b>
              </div>
              <div>
                Лимит по тарифу <b>100</b>
              </div>
            </div>

            <div className="search-header__user">
              <span>Алексей Н.</span>
              <div className="search-header__avatar"></div>
            </div>
          </div>
        </div>
      </header>

      <main className="search-main">
        <div className="container">
          <section className="search-hero">
            <div className="search-hero__content">
              <h1 className="search-hero__title">
                НАЙДИТЕ НЕОБХОДИМЫЕ
                <br />
                ДАННЫЕ В ПАРУ КЛИКОВ.
              </h1>

              <p className="search-hero__text">
                Задайте параметры поиска.
                <br />
                Чем больше заполните, тем точнее поиск
              </p>
            </div>

          </section>

          <section className="search-content">
            <div className="search-form-card">
              <form className="search-form" onSubmit={handleSubmit}>
                <div className="search-form__left">
                  <label className="search-form__label">ИНН компании*</label>
                  <input
                    type="text"
                    name="inn"
                    placeholder="10 цифр"
                    className={`search-form__input ${
                      errors.inn ? "search-form__input--error" : ""
                    }`}
                    value={formData.inn}
                    onChange={handleChange}
                  />
                  {errors.inn && <p className="search-form__error">{errors.inn}</p>}

                  <label className="search-form__label">Тональность</label>
                  <select
                    name="tone"
                    className="search-form__select"
                    value={formData.tone}
                    onChange={handleChange}
                  >
                    <option>Любая</option>
                    <option>Позитивная</option>
                    <option>Негативная</option>
                  </select>

                  <label className="search-form__label">
                    Количество документов в выдаче*
                  </label>
                  <input
                    type="number"
                    name="docsCount"
                    placeholder="От 1 до 1000"
                    className={`search-form__input ${
                      errors.docsCount ? "search-form__input--error" : ""
                    }`}
                    value={formData.docsCount}
                    onChange={handleChange}
                  />
                  {errors.docsCount && (
                    <p className="search-form__error">{errors.docsCount}</p>
                  )}

                  <label className="search-form__label">Диапазон поиска*</label>

                  <div className="search-form__dates">
                    <div className="search-form__date-wrap">
                      <input
                        type="date"
                        name="dateFrom"
                        className={`search-form__input search-form__input--date ${
                          errors.dateFrom ? "search-form__input--error" : ""
                        }`}
                        value={formData.dateFrom}
                        onChange={handleChange}
                      />
                      {errors.dateFrom && (
                        <p className="search-form__error">{errors.dateFrom}</p>
                      )}
                    </div>

                    <div className="search-form__date-wrap">
                      <input
                        type="date"
                        name="dateTo"
                        className={`search-form__input search-form__input--date ${
                          errors.dateTo ? "search-form__input--error" : ""
                        }`}
                        value={formData.dateTo}
                        onChange={handleChange}
                      />
                      {errors.dateTo && (
                        <p className="search-form__error">{errors.dateTo}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="search-form__right">
                  <label className="search-form__checkbox">
                    <input
                      type="checkbox"
                      name="maxFullness"
                      checked={formData.maxFullness}
                      onChange={handleChange}
                    />
                    <span>Признак максимальной полноты</span>
                  </label>

                  <label className="search-form__checkbox">
                    <input
                      type="checkbox"
                      name="businessContext"
                      checked={formData.businessContext}
                      onChange={handleChange}
                    />
                    <span>Упоминания в бизнес-контексте</span>
                  </label>

                  <label className="search-form__checkbox">
                    <input
                      type="checkbox"
                      name="mainRole"
                      checked={formData.mainRole}
                      onChange={handleChange}
                    />
                    <span>Главная роль в публикации</span>
                  </label>

                  <label className="search-form__checkbox">
                    <input
                      type="checkbox"
                      name="riskFactors"
                      checked={formData.riskFactors}
                      onChange={handleChange}
                    />
                    <span>Публикации только с риск-факторами</span>
                  </label>

                  <label className="search-form__checkbox">
                    <input
                      type="checkbox"
                      name="techNews"
                      checked={formData.techNews}
                      onChange={handleChange}
                    />
                    <span>Включать технические новости рынков</span>
                  </label>

                  <label className="search-form__checkbox">
                    <input
                      type="checkbox"
                      name="announcements"
                      checked={formData.announcements}
                      onChange={handleChange}
                    />
                    <span>Включать анонсы и календари</span>
                  </label>

                  <label className="search-form__checkbox">
                    <input
                      type="checkbox"
                      name="newsSummary"
                      checked={formData.newsSummary}
                      onChange={handleChange}
                    />
                    <span>Включать сводки новостей</span>
                  </label>
                </div>

                <div className="search-form__bottom">
                  <button
                    type="submit"
                    className="search-form__submit"
                    disabled={!isFormValid}
                  >
                    Поиск
                  </button>

                  <p className="search-form__hint">
                    * Обязательные к заполнению поля
                  </p>
                </div>
              </form>
            </div>

            <div className="search-image">
              <img
                src={searchImg}
                alt="Поиск данных"
                className="search-image__img"
              />
            </div>
          </section>

          {showResults && (
            <section className="results-section">
              <h2 className="results-section__title">ОБЩАЯ СВОДКА</h2>

              {isResultsLoading ? (
                <div className="results-loader">
                  <div className="results-loader__spinner"></div>
                  <p>Загружаем данные...</p>
                </div>
              ) : (
                <>
                  <div className="histogram-table">
                    <div className="histogram-table__head">
                      <div>Период</div>
                      <div>Всего</div>
                      <div>Риски</div>
                    </div>

                    <div className="histogram-table__body">
                      {histograms.map((item, index) => (
                        <div className="histogram-table__column" key={index}>
                          <div>{item.period}</div>
                          <div>{item.total}</div>
                          <div>{item.risks}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <h2 className="results-section__title results-section__title--docs">
                    СПИСОК ДОКУМЕНТОВ
                  </h2>

                  <div className="documents-grid">
                    {visibleDocuments.map((doc) => (
                      <article className="doc-card" key={doc.id}>
                        <div className="doc-card__meta">
                          <span>{doc.date}</span>
                          <a href={doc.url} target="_blank" rel="noreferrer">
                            {doc.source}
                          </a>
                        </div>

                        <h3 className="doc-card__title">{doc.title}</h3>

                        <div className="doc-card__tags">
                          {renderTags(doc.attributes)}
                        </div>

                        {doc.image && (
                          <img
                            src={doc.image}
                            alt={doc.title}
                            className="doc-card__image"
                          />
                        )}

                        <p className="doc-card__text">{doc.text}</p>

                        <div className="doc-card__footer">
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noreferrer"
                            className="doc-card__button"
                          >
                            Читать в источнике
                          </a>

                          <span className="doc-card__words">{doc.wordCount} слов</span>
                        </div>
                      </article>
                    ))}
                  </div>

                  {visibleDocuments.length < allDocuments.length && (
                    <button
                      type="button"
                      className="show-more-button"
                      onClick={handleShowMore}
                    >
                      Показать больше
                    </button>
                  )}
                </>
              )}
            </section>
          )}
        </div>
      </main>

      <footer className="search-footer">
        <div className="container search-footer__inner">
          <div className="search-footer__logo">СКАН</div>

          <div className="search-footer__info">
            <div>г. Москва, Цветной б-р, 40</div>
            <div>+7 495 771 21 11</div>
            <div>info@scan.ru</div>
            <div className="search-footer__copyright">Copyright. 2022</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SearchPage;