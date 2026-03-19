import "./Header.css";

function Header() {
  return (
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
        </div>
      </div>
    </header>
  );
}

export default Header;