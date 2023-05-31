import React, { useEffect, useState } from "react";
import AllProducts from "../ProductsLists/CategoryComponents/AllProducts/AllProducts.js";
import Subscribe from "../Subscribe/Subscribe";
import Footer from "../Reusable/Footer/Footer";
import Nav from "../Reusable/Navs/Main_Nav/Nav";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleSearch } from "../../redux/features/productsSlice.js";

function SearchResults() {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const products = useSelector(state=>state.products.search);

  const [totalProductsNumber, setTotalProductsNumber] = useState(0);

  useEffect(() => {
    dispatch(handleSearch({name:state.name}))
    // axios
    //   .get(`${config.SERVER_URL}/products/search/${state.name}`)
    //   .then((result) => {
    //     setTotalProductsNumber(result.data.length);
    //     setProducts(result.data);
    //   });
  }, [dispatch,state.name]);

  return (
    <div>
      <Nav />

      <div className="container pt-2">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li class="breadcrumb-item">
              <a href="/">Search</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {state.name}
            </li>
          </ol>
        </nav>
        {/*image*/}

        <AllProducts
          searchProducts={products}
          totalProductsNumber={totalProductsNumber}
          filterProducts={products}
        />
      </div>

      <Subscribe />
      <Footer />
    </div>
  );
}

export default SearchResults;
