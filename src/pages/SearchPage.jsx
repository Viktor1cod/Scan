import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
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

function SearchPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);

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
    navigate("/results", { state: { formData } });
  };

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

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SearchPage;
