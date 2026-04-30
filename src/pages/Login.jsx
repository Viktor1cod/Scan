import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Login.css";
import loginImage from "../assets/images/login-illustration.png";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
    navigate("/");
  };

  return (
    <div className="login-page">
      <Header />

      <main className="login-main">
        <div className="container login-main__inner">
          <section className="login-info">
            <h1 className="login-info__title">
              ДЛЯ ОФОРМЛЕНИЯ ПОДПИСКИ НА ТАРИФ, НЕОБХОДИМО АВТОРИЗОВАТЬСЯ
            </h1>
            <img src={loginImage} alt="Авторизация" className="login-info__image" />
          </section>

          <section className="login-card-wrap">
            <div className="login-card__lock">🔒</div>

            <div className="login-card">
              <div className="login-card__tabs">
                <button type="button" className="login-card__tab login-card__tab--active">
                  Войти
                </button>
                <button type="button" className="login-card__tab">
                  Зарегистрироваться
                </button>
              </div>

              <form className="login-form" onSubmit={handleSubmit}>
                <label className="login-form__label">Логин или номер телефона:</label>
                <input type="text" className="login-form__input" />

                <label className="login-form__label">Пароль:</label>
                <input type="password" className="login-form__input" />

                <button type="submit" className="login-form__submit">Войти</button>
                <button type="button" className="login-form__restore">Восстановить пароль</button>
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

      <Footer />
    </div>
  );
}

export default Login;
