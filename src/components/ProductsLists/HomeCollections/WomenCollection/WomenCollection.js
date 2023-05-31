import React, { useEffect, useState } from "react";
import Product from "../../../Reusable/SingleProduct/Product";
import "../CollectionsStyle.css";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategory } from "../../../../redux/features/productsSlice";

function KidsCollection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const womenCollection = useSelector(state => state.products.women);
  const theme = useSelector(state => state.auth.theme);


  const handlePrevClick = () => {
    const container = document.querySelector(".women-list");
    if (container) {
      container.scrollLeft -= 200;
    }
  };

  const handleNextClick = () => {
    const container = document.querySelector(".women-list");
    if (container) {
      container.scrollLeft += 200;
    }
  };

  useEffect(() => {
    dispatch(
      fetchProductsByCategory({ forHome: true, category: "women" })
    );
  }, [dispatch]);

  return (
    <div className={`WomenCollection ${theme}`}>
      <div className="container">
        <div className="row collection_sec d-flex justify-content-center">
          <div className="collection_title d-flex justify-content-between align-items-center p-0">
            <h2>Women Collection</h2>
            <a href="women" className="text-ligt more">
              See more <ArrowForwardIosRoundedIcon className="more_arrow" />
            </a>
          </div>
          <div className="product-list">
            <button className="arrows left" onClick={handlePrevClick}>
              <ArrowBackIosNewRoundedIcon className="arrows_icon" />
            </button>
            {womenCollection.length > 0 && (
              <div className="product-list-inner women-list mx-auto">
                {womenCollection
                  .map((item) => {
                    return (
                      <Product key={item.id} item={item} navigate={navigate} />
                    );
                  })}
              </div>
            )}

            <button className="arrows right" onClick={handleNextClick}>
              <ArrowForwardIosRoundedIcon className="arrows_icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KidsCollection;
