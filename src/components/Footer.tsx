import React from "react";
import { ChevronDown } from "lucide-react";
import useMediaQuery from "../useMediaQuery";
import "../styles/Footer.scss";

const footerData: { [key: string]: string[] } = {
  Shop: ["Seating", "Modules", "Tables", "Storage", "Accessories", "Outdoor", "Refurbished", "Gift Cards"],
  Explore: ["Altus Collection", "Ciello Collection", "Atmosphere Collection", "Neptune Collection", "Mistral Collection", "Free Swatches", "Blog - Simone's Corner", "Our Locations"],
  Company: ["About Cozey", "Our Story", "Our Initiatives", "Our Approach", "Careers"],
  Support: ["Track My Order", "FAQs", "Shipping", "Returns", "Warranty", "Financing", "Reviews", "Assembly Guides", "Consultations"],
  "Follow Us": ["Instagram →", "Youtube →", "Facebook →", "X(Twitter) →", "Pinterest →", "TikTok →", "LinkedIn →"],
};

const Footer: React.FC = () => {
    const isDesktop = useMediaQuery("(min-width: 1280px)");
  return (
    <footer className="footer">
      <div className="footer__sections">
        {Object.entries(footerData).map(([title, items], index) =>
          isDesktop ? (
            <div key={index} className="footer__dropdown footer__dropdown--desktop">
              <h4 className="footer__summary">{title}</h4>
              <ul className="footer__list">
                {items.map((item, i) => (
                  <li key={i} className="footer__item">{item}</li>
                ))}
              </ul>
            </div>
          ) : (
            <details key={index} className="footer__dropdown">
              <summary className="footer__summary">
                <span>{title}</span>
                <ChevronDown className="footer__icon" />
              </summary>
              <ul className="footer__list">
                {items.map((item, i) => (
                  <li key={i} className="footer__item">{item}</li>
                ))}
              </ul>
            </details>
          )
        )}
      </div>

      <div className="footer__legal">
        <p className="footer__copyright">© 2024 Cozey Inc. All rights reserved.</p>
        <div className="footer__links">
          <a href="#" className="footer__link">Privacy Policy</a>
          <a href="#" className="footer__link">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
