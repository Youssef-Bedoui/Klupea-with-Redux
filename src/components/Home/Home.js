import React, { useEffect, useState } from "react";
import "./Home.css";
import Subscribe from "../Subscribe/Subscribe.js";
import Footer from "../Reusable/Footer/Footer.js";
import MenCollection from "./../ProductsLists/HomeCollections/MenCollection/MenCollection";
import WomenCollection from "./../ProductsLists/HomeCollections/WomenCollection/WomenCollection";
import KidsCollection from "../ProductsLists/HomeCollections/KidsCollection/KidsCollection";
import Nav from "../Reusable/Navs/Main_Nav/Nav";
import BrandSection from "./../BrandSection/BrandSection";
import NewArrivalCollection from "./../ProductsLists/HomeCollections/NewArrivalCollection/NewArrivalCollection";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";


const Home = () => {
    const navigate = useNavigate();
    //check session
    const [isAuth, setIsAuth] = useState(false);
    const theme = useSelector(state=>state.auth.theme);

    axios.defaults.withCredentials = true

    // useEffect(() => {
    //     const checkSession = async () => {
    //         try {
    //             const response = await axios.get(`${config.SERVER_URL}/auth/checkRefToken`);
    //             const data = response.data;
    //             console.log(data)
    //             if (data.msg === "No refreshToken") {
    //                 navigate("signIn")
    //             } else {
    //                 setIsAuth(true);
    //                 console.log(data);
    //             }
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     checkSession();
    // }, []);


    
    return (
      <div className={`Main ${theme}`} id="home">
        <Nav />
        <div className="container_fluid">
          <div className="hero">
            <div className="hero_description pt-3">
              <h1 className="hero_title1 pt-0">
                New<span className="fw-bold fs-6 text-primary">2023</span>
              </h1>
              <h1 className="hero_title2">Arrivals</h1>
              <a
                href="#newArrival"
                style={{ background: "var(--pink)" }}
                className="btn btn-lg text-light ms-2"
              >
                SHOP NOW
              </a>
            </div>
            <div className="heroBtns">
              <button
                onClick={() => {
                  navigate("/men");
                }}
                className="btn m-3 menBtn"
              >
                Shop Men's
              </button>
              <button
                onClick={() => {
                  navigate("women");
                }}
                className="btn m-3 womenBtn"
              >
                Shop Women's
              </button>
              <button
                onClick={() => {
                  navigate("/kids");
                }}
                className="btn m-3 kidsBtn"
              >
                Shop Kids's
              </button>
            </div>
          </div>
          <BrandSection />
          <NewArrivalCollection />
          <MenCollection />
          <WomenCollection />
          <KidsCollection />

          <Subscribe />

          <Footer />
        </div>
      </div>
    );
}
export default Home
