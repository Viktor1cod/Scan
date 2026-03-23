import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";
import loginImage from "../assets/images/login-illustration.png";

function Login({ onLogin }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
    navigate("/");
  };

  return (
    <div className="login-page">
      <header className="login-header">
        <div className="container login-header__inner">
          <div className="login-header__logo">СКАН</div>

          <nav className="login-header__nav">
            <Link to="/">Главная</Link>
            <a href="#tariffs">Тарифы</a>
            <a href="#faq">FAQ</a>
          </nav>

          <div className="login-header__actions">
            <a href="#" className="login-header__register">
              Зарегистрироваться
            </a>
            <Link to="/login" className="login-header__enter">
              Войти
            </Link>
          </div>
        </div>
      </header>

      <main className="login-main">
        <div className="container login-main__inner">
          <section className="login-info">
            <h1 className="login-info__title">
              ДЛЯ ОФОРМЛЕНИЯ ПОДПИСКИ НА ТАРИФ, НЕОБХОДИМО АВТОРИЗОВАТЬСЯ
            </h1>

            <img
              src={loginImage}
              alt="Авторизация"
              className="login-info__image"
            />
          </section>

          <section className="login-card-wrap">
            <div className="login-card__lock">🔒</div>

            <div className="login-card">
              <div className="login-card__tabs">
                <button
                  type="button"
                  className="login-card__tab login-card__tab--active"
                >
                  Войти
                </button>
                <button type="button" className="login-card__tab">
                  Зарегистрироваться
                </button>
              </div>

              <form className="login-form" onSubmit={handleSubmit}>
                <label className="login-form__label">
                  Логин или номер телефона:
                </label>
                <input type="text" className="login-form__input" />

                <label className="login-form__label">Пароль:</label>
                <input type="password" className="login-form__input" />

                <button type="submit" className="login-form__submit">
                  Войти
                </button>

                <button type="button" className="login-form__restore">
                  Восстановить пароль
                </button>
              </form>

              <div className="login-social">
                <p className="login-social__title">Войти через:</p>

                <div className="login-social__buttons">
                  <button type="button">Google</button>
                  <button type="button">Facebook</button>
                  <button type="button">Яндекс</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="login-footer">
        <div className="container login-footer__inner">
          <div className="login-footer__logo">СКАН</div>

          <div className="login-footer__info">
            <div>г. Москва, Цветной б-р, 40</div>
            <div>+7 495 771 21 11</div>
            <div>info@scan.ru</div>
            <div className="login-footer__copyright">Copyright. 2022</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Login;