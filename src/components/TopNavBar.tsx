import React, { useState, useEffect } from "react";
import "flag-icons/css/flag-icons.min.css";
import { ChevronDown } from "lucide-react";
import useMediaQuery from "../useMediaQuery";
import "../styles/TopNavBar.scss";

const languages = {
  EN_CA: { label: "EN", code: "ca" },
  EN_US: { label: "EN", code: "us" },
  FR: { label: "FR", code: "fr" },
};

type LanguageKey = keyof typeof languages;

const TopNavBar: React.FC = () => {
    const isDesktop = useMediaQuery("(min-width: 1280px)");
    const [selectedLang, setSelectedLang] = useState<LanguageKey>("EN_CA");
    const [isOpen, setIsOpen] = useState(false);
  
    useEffect(() => {
      setSelectedLang(isDesktop ? "EN_US" : "EN_CA");
    }, [isDesktop]);
  
    const toggleDropdown = () => setIsOpen(!isOpen);
    const selectLanguage = (lang: LanguageKey) => {
      setSelectedLang(lang);
      setIsOpen(false);
    };

  return (
    <div className="top-nav">
    <div className="top-nav__info">
      <span className="top-nav__info--mobile">
        Designed in Montreal <span className="top-nav__divider">|</span> Fast & Free Shipping
      </span>
      <span className="top-nav__info--desktop">
        Designed in North America <span className="top-nav__divider">|</span> Fast & Free Shipping
      </span>
    </div>

    <div className="top-nav__links">
      <a href="#" className="top-nav__link">Reviews</a>
      <a href="#" className="top-nav__link">Free Swatches</a>
      <a href="#" className="top-nav__link">Financing</a>
      <a href="#" className="top-nav__link">Support</a>
      <a href="#" className="top-nav__link">Contact Us</a>
      <a href="#" className="top-nav__link">Our Locations</a>
    </div>

    <div className="top-nav__locale" onClick={toggleDropdown}>
      <span className="top-nav__lang">{languages[selectedLang].label}</span>
      <span className={`fi fi-${languages[selectedLang].code} top-nav__flag`} />
      <span className="top-nav__arrow"><ChevronDown size={13} /></span>
      {isOpen && (
        <ul className="top-nav__dropdown">
          {Object.entries(languages).map(([key, { label, code }]) => (
            <li
              key={key}
              className="top-nav__option"
              onClick={() => selectLanguage(key as LanguageKey)}
            >
              <span className={`fi fi-${code} top-nav__flag`} />
              <span className="top-nav__option-label">{label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);
};

export default TopNavBar;