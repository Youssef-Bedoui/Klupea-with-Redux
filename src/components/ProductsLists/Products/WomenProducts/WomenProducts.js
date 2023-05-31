import React from "react";
import ProductsHeader from "../../CategoryComponents/CategoryHeader/ProductsHeader";
import AllProducts from "../../CategoryComponents/AllProducts/AllProducts";
import WomenCategories from "./WomenCategories";
import Tshirt from "../../../../images/women Categories/My project (8).png";
import Sweaters from "../../../../images/women Categories/My project (5).png";
import Pants from "../../../../images/women Categories/My project (3).png";
import Skirts from "../../../../images/women Categories/skirts.png";
import Shoes from "../../../../images/women Categories/My project (7).png";
import HighHeels from "../../../../images/women Categories/My project (6).png";
import Underwear from "../../../../images/women Categories/My project (2).png";
import Jackets from "../../../../images/women Categories/My project (9).png";
import Subscribe from "../../../Subscribe/Subscribe";
import Footer from "../../../Reusable/Footer/Footer";
import { useEffect } from "react";
import Nav from "../../../Reusable/Navs/Main_Nav/Nav";
import { useDispatch } from "react-redux";
import { fetchProductsByCategory } from "../../../../redux/features/productsSlice";

function WomenProducts({ image, category }) {
const dispatch = useDispatch();

  useEffect(() => {
    if (category) {
      dispatch(
        fetchProductsByCategory({ forHome: false, category: `women/${category}` })
      );
    } else {
      dispatch(fetchProductsByCategory({ forHome: false, category: `women` }));
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
              Women
            </li>
          </ol>
        </nav>
        {/*image*/}
        <ProductsHeader image={image} />

        <WomenCategories
          image1={Tshirt}
          image2={Sweaters}
          image3={Pants}
          image4={Skirts}
          image5={Shoes}
          image6={HighHeels}
          image7={Underwear}
          image8={Jackets}
        />

        <AllProducts/>
      </div>

      <Subscribe />
      <Footer />
    </div>
  );
}

export default WomenProducts;
