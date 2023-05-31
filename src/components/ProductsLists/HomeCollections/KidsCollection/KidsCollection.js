import React, { useEffect, useState } from 'react';
import Product from "../../../Reusable/SingleProduct/Product";
import "../CollectionsStyle.css";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory } from '../../../../redux/features/productsSlice';

function KidsCollection() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const kidsCollection = useSelector(state => state.products.kids);
    const theme = useSelector(state => state.auth.theme);

 const handlePrevClick = () => {
   const container = document.querySelector(".kids-list");
   if (container) {
     container.scrollLeft -= 200;
   }
 };

 const handleNextClick = () => {
   const container = document.querySelector(".kids-list");
   if (container) {
     container.scrollLeft += 200;
   }
 };

    useEffect(() => {
      dispatch(
        fetchProductsByCategory({ forHome: true, category: "kids" })
      );
    }, [dispatch]);



    return (
        <div className={`KidsCollection ${theme}`}>
            <div className="container">
                <div className="row collection_sec d-flex justify-content-center">
                    <div className="collection_title d-flex justify-content-between align-items-center p-0">
                        <h2>Kids Collection</h2>
                        <a href="kids" className="text-ligt more">See more <ArrowForwardIosRoundedIcon className="more_arrow" /></a>
                    </div>
                    <div className="product-list">
                        <button className="arrows left" onClick={handlePrevClick}><ArrowBackIosNewRoundedIcon className="arrows_icon" /></button>
                        <div className="product-list-inner kids-list mx-auto">
                            {kidsCollection.map(item => {
                                return (
                                    <Product key={item.id} item={item} navigate={navigate} />
                                )
                            }
                            )}
                        </div>
                        <button className="arrows right" onClick={handleNextClick}><ArrowForwardIosRoundedIcon className="arrows_icon" /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default KidsCollection
