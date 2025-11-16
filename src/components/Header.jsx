import React from 'react';
import logo from '../assets/img/pizza-logo.svg';
import { Link } from 'react-router-dom';
import Search from '../scss/components/Search';

const Header = ({ search, setSearch }) => {
  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={logo} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>The most deliciouse pizza</p>
            </div>
          </div>
        </Link>
        <Search search={search} setSearch={setSearch} />
        <div className="header__cart"></div>
      </div>
    </div>
  );
};

export default Header;
