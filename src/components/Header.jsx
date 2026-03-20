import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { useState } from "react";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="container header__inner">
          <div className="header__logo">СКАН</div>

          <nav className="header__nav">
            <a href="#">Главная</a>
            <a href="#tariffs">Тарифы</a>
            <a href="#faq">FAQ</a>
          </nav>

          <div className="header__right">
            <div className="header__stats">
              <div>Использовано компаний <b>34</b></div>
              <div>Лимит по тарифу <b>100</b></div>
            </div>

            <div className="header__user">
              <span>Алексей Н.</span>
              <div className="header__avatar"></div>
            </div>

          <button
          className="header__burger"
          onClick={() => setMenuOpen(true)}
          aria-label="Открыть меню">
          <HiOutlineMenuAlt3 />
        </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu__top">
            <div className="mobile-menu__logo">СКАН</div>

                        <button
              className="mobile-menu__close"
              onClick={() => setMenuOpen(false)}
              aria-label="Закрыть меню">
              <HiOutlineX />
            </button>
          </div>

          <nav className="mobile-menu__nav">
            <a href="#" onClick={() => setMenuOpen(false)}>Главная</a>
            <a href="#tariffs" onClick={() => setMenuOpen(false)}>Тарифы</a>
            <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
          </nav>

          <button className="mobile-menu__login">Войти</button>
        </div>
      )}
    </>
  );
}

export default Header;