import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import AOS from "aos";
import "aos/dist/aos.css";

// Initialize AOS
AOS.init();

const HomePage = () => {
  const styles = {
    backgroundImage: `url('https://images.unsplash.com/photo-1475275083424-b4ff81625b60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "92vh",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: "5vw",
  };

  return (
    <div className="home-page" style={styles}>
      <span
        className="fs-2 fw-bold welcome-text"
        data-aos="fade-up"
        data-aos-easing="linear"
        data-aos-delay="500"
      >
        Welcome to
      </span>
      <h1
        className="display-2 store-name"
        data-aos="fade-up"
        data-aos-easing="linear"
        data-aos-delay="1000"
      >
        Random Store
      </h1>
      <p
        className="fs-5 store-description"
        data-aos="fade-up"
        data-aos-easing="linear"
        data-aos-delay="1500"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <Link
        to="/items"
        className="btn btn-primary get-started-btn"
        data-aos="fade-up"
        data-aos-easing="linear"
        data-aos-delay="2000"
      >
        Get Started
      </Link>
    </div>
  );
};

export default HomePage;
