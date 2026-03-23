import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./SearchPage.css";
import searchImg from "../assets/images/search-illustration.png";

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
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
      nextErrors.dateTo = "Дата конца должна быть позже даты начала";
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

    console.log("Форма отправлена:", formData);
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

            <div className="search-hero__icons">
              <span>📄</span>
              <span>📁</span>
              <span>📇</span>
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
                    className={`search-form__input ${errors.docsCount ? "search-form__input--error" : ""}`}
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