import React, { useEffect, useState } from "react";
import ProductsHeader from "../../CategoryComponents/CategoryHeader/ProductsHeader";
import AllProducts from "../../CategoryComponents/AllProducts/AllProducts";
import MenCategories from "./MenCategories";
import Tshirt from "../../../../images/men Categories/Men_T-shirts.png";
import Sweaters from "../../../../images/men Categories/Men_Sweaters.png";
import Pants from "../../../../images/men Categories/Men_Pants.png";
import Suits from "../../../../images/men Categories/Men_Suits.png";
import Shoes from "../../../../images/men Categories/Men_Shoes.png";
import coats from "../../../../images/men Categories/Men_coat.png";
import underwears from "../../../../images/men Categories/Men_underwears.png";
import accessories from "../../../../images/men Categories/Men_accessories.png";
import Subscribe from "../../../Subscribe/Subscribe";
import Footer from "../../../Reusable/Footer/Footer";
import Nav from "../../../Reusable/Navs/Main_Nav/Nav";
import { useDispatch } from "react-redux";
import { fetchProductsByCategory } from "../../../../redux/features/productsSlice";

function MenProducts({ image, category }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if(category){
      dispatch(
        fetchProductsByCategory({ forHome: false, category: `men/${category}` })
      );
    }else{
      dispatch(
        fetchProductsByCategory({ forHome: false, category: `men` })
      );
    }
  }, [category, dispatch]);

  return (
    <div>
      <Nav />

      <div className="container pt-2">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Men
            </li>
          </ol>
        </nav>
        {/*image*/}
        <ProductsHeader image={image} />

        <MenCategories
          image1={Tshirt}
          image2={Sweaters}
          image3={Pants}
          image4={Suits}
          image5={Shoes}
          image6={coats}
          image7={underwears}
          image8={accessories}
        />

        <AllProducts />
      </div>

      <Subscribe />
      <Footer />
    </div>
  );
}

export default MenProducts;
