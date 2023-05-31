import React, {useEffect } from "react";
import "../CollectionsStyle.css";
import { useNavigate } from "react-router-dom";
import Product from "../../../Reusable/SingleProduct/Product";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { fetchProductsByCategory } from "../../../../redux/features/productsSlice";
import { useDispatch, useSelector } from "react-redux";

function MenCollection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menCollection = useSelector(state => state.products.men);
  const theme = useSelector(state => state.auth.theme);

 const handlePrevClick = () => {
   const container = document.querySelector(".men-list");
   if (container) {
     container.scrollLeft -= 200;
   }
 };

 const handleNextClick = () => {
   const container = document.querySelector(".men-list");
   if (container) {
     container.scrollLeft += 200;
   }
 };

  useEffect(() => {
    dispatch(fetchProductsByCategory({ forHome: true, category: "men" }));
  }, [dispatch]);

  return (
    <div id="menCollection" className={`MenCollection ${theme}`}>
      <div className="container">
        <div className="row collection_sec d-flex justify-content-center">
          <div className="collection_title d-flex justify-content-between align-items-center p-0">
            <h2>Men Collection</h2>
            <a href="men" className="text-ligt more">
              See more <ArrowForwardIosRoundedIcon className="more_arrow" />
            </a>
          </div>
          <div className="product-list">
            <button className="arrows left" onClick={handlePrevClick}>
              <ArrowBackIosNewRoundedIcon className="arrows_icon" />
            </button>
            {menCollection.length > 0 && (
              <div className="product-list-inner men-list mx-auto">
                {menCollection
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

export default MenCollection;
