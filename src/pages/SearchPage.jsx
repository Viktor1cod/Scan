import { useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { mockHistograms, mockDocuments } from "../mocks/searchData";
import { validateSearchForm } from "../utils/validation";
import "./SearchPage.css";
import searchImg from "../assets/images/search-illustration.png";

const INITIAL_FORM = {
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
};

const INITIAL_ERRORS = { inn: "", docsCount: "", dateFrom: "", dateTo: "" };
const PAGE_SIZE = 10;

function renderTags(attributes) {
  const tags = [];
  if (attributes.isTechNews)
    tags.push(<span key="tech" className="doc-card__tag doc-card__tag--yellow">Технические новости</span>);
  if (attributes.isAnnouncement)
    tags.push(<span key="announcement" className="doc-card__tag doc-card__tag--green">Анонсы и события</span>);
  if (attributes.isDigest)
    tags.push(<span key="digest" className="doc-card__tag doc-card__tag--orange">Сводки новостей</span>);
  return tags;
}

function SearchPage() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [isResultsLoading, setIsResultsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [histograms, setHistograms] = useState([]);
  const [allDocuments, setAllDocuments] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleDocuments = allDocuments.slice(0, visibleCount);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (name in errors) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const isFormValid = useMemo(() => {
    const errs = validateSearchForm(formData);
    return !Object.values(errs).some(Boolean);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validateSearchForm(formData);
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setShowResults(true);
    setIsResultsLoading(true);

    setTimeout(() => {
      setHistograms(mockHistograms);
      setAllDocuments(mockDocuments);
      setVisibleCount(PAGE_SIZE);
      setIsResultsLoading(false);
    }, 1200);
  };

  const handleShowMore = () => setVisibleCount((c) => c + PAGE_SIZE);

  return (
    <div className="search-page">
      <Header />

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
                    className={`search-form__input ${errors.inn ? "search-form__input--error" : ""}`}
                    value={formData.inn}
                    onChange={handleChange}
                  />
                  {errors.inn && <p className="search-form__error">{errors.inn}</p>}

                  <label className="search-form__label">Тональность</label>
                  <select name="tone" className="search-form__select" value={formData.tone} onChange={handleChange}>
                    <option>Любая</option>
                    <option>Позитивная</option>
                    <option>Негативная</option>
                  </select>

                  <label className="search-form__label">Количество документов в выдаче*</label>
                  <input
                    type="number"
                    name="docsCount"
                    placeholder="От 1 до 1000"
                    className={`search-form__input ${errors.docsCount ? "search-form__input--error" : ""}`}
                    value={formData.docsCount}
                    onChange={handleChange}
                  />
                  {errors.docsCount && <p className="search-form__error">{errors.docsCount}</p>}

                  <label className="search-form__label">Диапазон поиска*</label>
                  <div className="search-form__dates">
                    <div className="search-form__date-wrap">
                      <input
                        type="date"
                        name="dateFrom"
                        className={`search-form__input search-form__input--date ${errors.dateFrom ? "search-form__input--error" : ""}`}
                        value={formData.dateFrom}
                        onChange={handleChange}
                      />
                      {errors.dateFrom && <p className="search-form__error">{errors.dateFrom}</p>}
                    </div>
                    <div className="search-form__date-wrap">
                      <input
                        type="date"
                        name="dateTo"
                        className={`search-form__input search-form__input--date ${errors.dateTo ? "search-form__input--error" : ""}`}
                        value={formData.dateTo}
                        onChange={handleChange}
                      />
                      {errors.dateTo && <p className="search-form__error">{errors.dateTo}</p>}
                    </div>
                  </div>
                </div>

                <div className="search-form__right">
                  {[
                    { name: "maxFullness", label: "Признак максимальной полноты" },
                    { name: "businessContext", label: "Упоминания в бизнес-контексте" },
                    { name: "mainRole", label: "Главная роль в публикации" },
                    { name: "riskFactors", label: "Публикации только с риск-факторами" },
                    { name: "techNews", label: "Включать технические новости рынков" },
                    { name: "announcements", label: "Включать анонсы и календари" },
                    { name: "newsSummary", label: "Включать сводки новостей" },
                  ].map(({ name, label }) => (
                    <label key={name} className="search-form__checkbox">
                      <input
                        type="checkbox"
                        name={name}
                        checked={formData[name]}
                        onChange={handleChange}
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>

                <div className="search-form__bottom">
                  <button type="submit" className="search-form__submit" disabled={!isFormValid}>
                    Поиск
                  </button>
                  <p className="search-form__hint">* Обязательные к заполнению поля</p>
                </div>
              </form>
            </div>

            <div className="search-image">
              <img src={searchImg} alt="Поиск данных" className="search-image__img" />
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
                          <a href={doc.url} target="_blank" rel="noreferrer">{doc.source}</a>
                        </div>
                        <h3 className="doc-card__title">{doc.title}</h3>
                        <div className="doc-card__tags">{renderTags(doc.attributes)}</div>
                        {doc.image && <img src={doc.image} alt={doc.title} className="doc-card__image" />}
                        <p className="doc-card__text">{doc.text}</p>
                        <div className="doc-card__footer">
                          <a href={doc.url} target="_blank" rel="noreferrer" className="doc-card__button">
                            Читать в источнике
                          </a>
                          <span className="doc-card__words">{doc.wordCount} слов</span>
                        </div>
                      </article>
                    ))}
                  </div>

                  {visibleDocuments.length < allDocuments.length && (
                    <button type="button" className="show-more-button" onClick={handleShowMore}>
                      Показать больше
                    </button>
                  )}
                </>
              )}
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SearchPage;
