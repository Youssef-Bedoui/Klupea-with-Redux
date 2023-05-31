import React, { useEffect, useState } from "react";
import "../CollectionsStyle.css";
import "./NewArrivalCollection.css";
import { useNavigate } from "react-router-dom";
import Product from "../../../Reusable/SingleProduct/Product";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNewArrival,
} from "../../../../redux/features/productsSlice";

function NewArrivalCollection() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const newCollection = useSelector((state) => state.products.newArrival);
  const theme = useSelector((state) => state.auth.theme);


 const handlePrevClick = () => {
   const container = document.querySelector(".product-list-inner");
   if (container) {
     container.scrollLeft -= 200;
   }
 };

 const handleNextClick = () => {
   const container = document.querySelector(".product-list-inner");
   if (container) {
     container.scrollLeft += 200;
   }
 };

  useEffect(() => {
    dispatch(fetchNewArrival());
  }, [dispatch]);

  return (
    <div id="newArrival" className={`NewCollection ${theme}`}>
      <div className="container">
        <div className="row collection_sec d-flex justify-content-center">
          <div className="collection_title new d-flex justify-content-between align-items-center p-0">
            <h2>NEW ARRIVAL</h2>
          </div>
          <div className="product-list">
            <button className="arrows left" onClick={() => handlePrevClick()}>
              <ArrowBackIosNewRoundedIcon className="arrows_icon" />
            </button>
            {newCollection.length > 0 && (
              <div className="product-list-inner mx-auto">
                {newCollection
                  .map((item) => {
                    return (
                      <Product key={item.id} item={item} navigate={navigate} />
                    );
                  })}
              </div>
            )}

            <button className="arrows right" onClick={() => handleNextClick()}>
              <ArrowForwardIosRoundedIcon className="arrows_icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewArrivalCollection;
