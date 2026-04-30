import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Header.css";

function Header() {
  const { isAuth, logout: onLogout } = useAuth();
  const [accountInfo, setAccountInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuth) {
      setAccountInfo(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const timer = setTimeout(() => {
      setAccountInfo({
        usedCompanies: 34,
        companyLimit: 100,
        userName: "Алексей Н.",
      });
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [isAuth]);

  return (
    <header className="header">
      <div className="container header__inner">
        <div className="header__logo">СКАН</div>

        <nav className="header__nav">
          <a href="/">Главная</a>
          <a href="#tariffs">Тарифы</a>
          <a href="#faq">FAQ</a>
        </nav>

        {!isAuth ? (
          <div className="header__guest">
            <a href="#" className="header__register">
              Зарегистрироваться
            </a>

            <span className="header__divider" />

            <Link to="/login" className="header__login-btn">
              Войти
            </Link>
          </div>
        ) : (
          <div className="header__auth">
            <div className="header__stats">
              {isLoading ? (
                <div className="header__loader-wrap">
                  <div className="header__loader" />
                </div>
              ) : (
                <>
                  <div>
                    Использовано компаний{" "}
                    <b>{accountInfo?.usedCompanies ?? 0}</b>
                  </div>
                  <div>
                    Лимит по тарифу <b>{accountInfo?.companyLimit ?? 0}</b>
                  </div>
                </>
              )}
            </div>

            <div className="header__user">
              <div className="header__user-info">
                <span className="header__user-name">
                  {accountInfo?.userName ?? "Пользователь"}
                </span>
                <button
                  type="button"
                  className="header__logout"
                  onClick={onLogout}
                >
                  Выйти
                </button>
              </div>

              <div className="header__avatar" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;