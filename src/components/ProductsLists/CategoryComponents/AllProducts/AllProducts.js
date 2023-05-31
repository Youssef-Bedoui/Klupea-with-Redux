import React, { useState } from "react";
import "./AllProducts.css";
import { useNavigate } from "react-router-dom";
import Product from "../../../Reusable/SingleProduct/Product";
import noProducts_img from "../../../../images/no_products.png";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../../../../redux/features/productsSlice";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function InnerCategory({ searchProducts }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.auth.theme);
  const products = useSelector((state) => state.products.products);
  const totalProductsNumber = useSelector(
    (state) => state.products.products.length
  );
  const totalNumber =
    (searchProducts && searchProducts.length) || totalProductsNumber;

  const [filterText, setFilterText] = useState("Latest products");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);

  //filters
  const filterByLatest = () => {
    const sortedProducts = [...products];
    sortedProducts.sort((a, b) => {
      const arrivalDateA = new Date(
        a.arrivalDate.split("/").reverse().join("-")
      );
      const arrivalDateB = new Date(
        b.arrivalDate.split("/").reverse().join("-")
      );
      return arrivalDateB.getTime() - arrivalDateA.getTime();
    });
    dispatch(updateProducts(sortedProducts));
  };

  const filterByAscPrice = () => {
    const sortedProducts = [...products];
    sortedProducts.sort((a, b) => a.price - b.price);
    dispatch(updateProducts(sortedProducts));
  };

  const filterByDescPrice = () => {
    const sortedProducts = [...products];
    sortedProducts.sort((a, b) => b.price - a.price);
    dispatch(updateProducts(sortedProducts));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const renderedItems =
    searchProducts && searchProducts.length
      ? searchProducts.slice(indexOfFirstItem, indexOfLastItem)
      : products.slice(indexOfFirstItem, indexOfLastItem);

  const numberOfPages = Math.ceil(
    searchProducts && searchProducts.length
      ? searchProducts.length / itemsPerPage
      : products.length / itemsPerPage
  );

  const productsRef = document.querySelector(".items");
  return (
    <div className={`items ${theme} py-2 mb-3`} id="top_page">
      <div className="container-fluid">
        <div
          className="row d-flex justify-content-center"
          id={`products ${theme}`}
        >
          <div className="filter_header">
            <div className="numbers">
              <p>
                <span className="fw-bold">
                  {renderedItems.length > itemsPerPage
                    ? itemsPerPage
                    : renderedItems.length}
                </span>{" "}
                products of {totalNumber}
              </p>
            </div>
            <div className="filter_dropdown dropdown">
              <button
                className="btn border dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Filter By: {filterText}
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li
                  onClick={() => {
                    filterByLatest();
                    setFilterText("Latest products");
                  }}
                >
                  <a className="dropdown-item">Latest products</a>
                </li>
                <li
                  onClick={() => {
                    filterByAscPrice();
                    setFilterText("Ascending price");
                  }}
                >
                  <a className="dropdown-item">Ascending price</a>
                </li>
                <li
                  onClick={() => {
                    filterByDescPrice();
                    setFilterText("Decreasing price");
                  }}
                >
                  <a className="dropdown-item">Decreasing price</a>
                </li>
                <li
                  onClick={() => {
                    setFilterText("High Noted");
                  }}
                >
                  <a className="dropdown-item">High Noted</a>
                </li>
              </ul>
            </div>
          </div>
          <hr />
          {renderedItems.length ? (
            <div
              className={`productsList ${theme} d-flex flex-wrap justify-content-between align-items-center`}
            >
              {renderedItems.map((item, index) => (
                <Product
                  key={item.id}
                  item={item}
                  index={index}
                  navigate={navigate}
                />
              ))}
            </div>
          ) : (
            <div className="d-flex flex-column justify-content-center align-items-center p-3">
              <img
                src={noProducts_img}
                className="img-fluid"
                alt="No products found"
              />
              <h5 className="fw-bold">Sorry, No products found!</h5>
            </div>
          )}
          {/* Page Numbers */}
          <div className="pageNumbers_sec">
            <span className="pages">Pages :</span>{" "}
            <Stack spacing={2}>
              <Pagination
                count={numberOfPages}
                variant="outlined"
                color="primary"
                page={currentPage}
                onChange={(event, value) => {setCurrentPage(value); productsRef.scrollIntoView({behavior:"smooth"})}}
              />
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InnerCategory;
