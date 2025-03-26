import React from "react";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import "../styles/Header.scss";

const Header: React.FC = () => {
  return (
    <header className="header">
      <a href="/" className="header__logo">cozey</a>

      <nav className="header__nav">
        <a href="#" className="header__link">Seating</a>
        <a href="#" className="header__link">Tables</a>
        <a href="#" className="header__link">Storage</a>
        <a href="#" className="header__link">Accessories</a>
        <a href="#" className="header__link">Washable Rugs</a>
        <a href="#" className="header__link">Outdoor</a>
      </nav>

      <div className="header__icons">
        <Search className="header__icon header__icon--mobile" />
        <User className="header__icon header__icon--mobile" />
        <Menu className="header__icon header__icon--mobile" />
        <ShoppingCart className="header__icon" />
      </div>
    </header>
  );
};

export default Header;
