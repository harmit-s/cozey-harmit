import React from "react";
import TopNavBar from "../components/TopNavBar";
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import SignupSection from "../components/SignupSection";
import Footer from "../components/Footer";

import "../styles/TopNavBar.scss";
import "../styles/Header.scss";
import "../styles/Carousel.scss";
import "../styles/SignupSection.scss";
import "../styles/Footer.scss";

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <TopNavBar />
      <Header />
      <main>
        <Carousel />
        <SignupSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;