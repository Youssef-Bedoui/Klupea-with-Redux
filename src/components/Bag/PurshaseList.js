/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Bag.css";
import { useState, useEffect } from "react";
import noItems from "../../images//no_items.png";
import Spinner from "../spinner/Spinner";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import SnackbarPop from "../Reusable/snackbarPop/SnackbarPop";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckIcon from "@mui/icons-material/Check";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useDispatch, useSelector } from "react-redux";
import {
  closeSuccess,
  deleteBagItem,
  getBagProducts,
  getProductSizes,
  handlePayment,
  modifBagProduct,
} from "../../redux/features/bagSlice";
import { useCallback } from "react";
import { decrementItemInBag, getItemsInBagNum, modifyUserAddress } from "../../redux/features/authSlice";

function PurshaseList() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.loading);
  const theme = useSelector((state) => state.auth.theme);
  const user = useSelector((state) => state.auth.user);
  const sizes = useSelector((state) => state.bag.sizes);
  const bagProducts = useSelector((state) => state.bag.bagProducts);
  const lineItems = useSelector((state) => state.bag.lineItems);
  const successOperation = useSelector((state) => state.bag.successOperation);
  const totalPrice = useSelector((state) => state.bag.totalPrice);
  const priceWithDelivery = useSelector((state) => state.bag.priceWithDelivery);
  const itemsInBag = useSelector((state) => state.auth.itemsInBag);
  const userID = user.id;

  //get sizes
  const getSizes = (productID) => {
    dispatch(getSizes({ productID }));
  };

  //order info
  const [userName, setuserName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  //address dualog
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //snackbar
  const [isOpen, setIsOpen] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "left",
  });

  const handleOpenSnack = () => {
    setIsOpen({ open: true, vertical: "bottom", horizontal: "left" });
  };

  const handleCloseSnack = () => {
    setIsOpen({
      open: false,
      vertical: "bottom",
      horizontal: "left",
    });
  };

  //stripe
  //order id generated
const getData = useCallback(async () => {
  dispatch(getBagProducts({ userID }));
}, [dispatch, userID]);

useEffect(() => {
  getData();
  if (successOperation) {
    handleOpenSnack();
    setTimeout(() => {
      handleCloseSnack();
      dispatch(closeSuccess());
    }, 3000);
  }
  //get items number
  dispatch(getItemsInBagNum({userID:user.id}))
}, [dispatch, getData, successOperation]);

  const deleteItem = async (id) => {
    dispatch(deleteBagItem({ id })).then(()=>{
      dispatch(decrementItemInBag(1));
    })
  };

  const selectSize = async (size, id) => {
    dispatch(modifBagProduct({ dataModified: "size", newData: size, id }));
  };

  const selectQuantity = async (quantity, id) => {
    dispatch(
      modifBagProduct({ dataModified: "quantity", newData: quantity, id })
    );
  };

  const processPayment = () => {
    dispatch(handlePayment({ lineItems,bagProducts,userID}));
  }

  const modifAddress = () => {
    dispatch(modifyUserAddress({ userID, userName, address, city, phone }));
  };

  return (
    <>
      <div className={`list ${theme}`}>
        <h1 className="text-center fw-bold mt-lg-3 mt-1">
          My Bag <ShoppingCartOutlinedIcon className="bag_icon" />
        </h1>

        {loading ? (
          <Spinner />
        ) : bagProducts.length ? (
          <div>
            <div className="container_fluid">
              <div className="row">
                <div className="left_list col-md-7 col-lg-8 col-12">
                  {bagProducts.length &&
                    bagProducts.map((product, index) => {
                      return (
                        <div className="itemCard" key={index}>
                          <span
                            onClick={() => {
                              deleteItem(product.id);
                            }}
                            className="deleteBtn"
                          >
                            <IconButton aria-label="delete" color="error">
                              <RemoveShoppingCartOutlinedIcon className="" />
                            </IconButton>
                          </span>
                          <img
                            className="img"
                            src={product.image}
                            alt="product_image"
                          />
                          <div className="description d-flex flex-column justify-content-around d-flex ms-2">
                            <p className="title">{product.name}</p>
                            <div className="row">
                              <div className="dropdown sizes col-3 col-md-3 col-lg-2">
                                <button
                                  className="btn btn-transparent dropdown-toggle"
                                  type="button"
                                  id="dropdownMenuButton"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                  onClick={() =>
                                    dispatch(
                                      getProductSizes({ productID: product.ID })
                                    )
                                  }
                                >
                                  Size: {product.orderSize}
                                </button>
                                <div
                                  className="dropdown-menu"
                                  aria-labelledby="dropdownMenuButton"
                                >
                                  {sizes.map((size, key) => (
                                    <p
                                      indek={key}
                                      onClick={() => {
                                        selectSize(size.size, product.id);
                                      }}
                                      className="dropdown-item"
                                    >
                                      {size.size}
                                    </p>
                                  ))}
                                </div>
                              </div>
                              <div className="dropdown quantity col-3 col-md-3 col-lg-2 offset-lg-1">
                                <button
                                  className="btn btn-transparent dropdown-toggle"
                                  type="button"
                                  id="dropdownMenuButton"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  Quantity: {product.orderQuantity}
                                </button>
                                <div
                                  className="dropdown-menu"
                                  aria-labelledby="dropdownMenuButton"
                                >
                                  {Array.from(Array(6).keys()).map((value) => (
                                    <p
                                      key={value}
                                      onClick={() => {
                                        selectQuantity(value + 1, product.id);
                                      }}
                                      className="dropdown-item"
                                    >
                                      {value + 1}
                                    </p>
                                  ))}
                                </div>
                              </div>
                              <div className="prices col-6 col-md-6 col-lg-5 ms-lg-auto d-flex flex-column justify-content-center align-items-end">
                                <span className="price">
                                  __ {product.price} TND
                                </span>
                                {product.prevPrice ? (
                                  <span className="lastPrice">
                                    {product.prevPrice} TND
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div
                  className={`price_details ${theme} col-md-5 col-lg-4 col-12`}
                >
                  <div className="container">
                    <p className="price_title">
                      ORDER DETAILS ({bagProducts.length} Item)
                    </p>
                    <hr></hr>
                    <div className="price_detail">
                      <p className="one_detail">Total</p>
                      <p className="price">{totalPrice} TND</p>
                    </div>
                    <div className="price_detail">
                      <p className="one_detail">Transportation fee</p>
                      <p className="price">7 TND</p>
                    </div>
                    <div
                      style={{ backgroundColor: "" }}
                      className={`p-2 fw-bold delivery_info ${theme} border border-dark`}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <p
                          style={{
                            fontSize: "small",
                            textDecorationLine: "underline",
                          }}
                          className=""
                        >
                          Delivery Infos {""}
                          <LocalShippingIcon />
                        </p>
                        <span
                          className="edit_address"
                          onClick={handleClickOpen}
                        >
                          <EditLocationAltIcon />
                          <span>Modify</span>
                        </span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0">Customer :</p>
                        <p className="mb-0">{user.userName}</p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0">Address :</p>
                        <p className="mb-0">{user.address}</p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0">City :</p>
                        <p className="mb-0">{user.city}</p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0">Phone :</p>
                        <p className="mb-0">{user.phone}</p>
                      </div>
                    </div>
                    <h6 style={{ fontSize: "small", margin: "0" }}>
                      <CheckIcon className="text-success" />
                      Shipment to {user.city} in 2-4 days
                    </h6>
                    <h6 style={{ fontSize: "small", margin: "0" }}>
                      <CheckIcon className="text-success" />
                      Safe Shipment with ARAMEX
                    </h6>
                    <h6 style={{ fontSize: "small", margin: "0" }}>
                      <CheckIcon className="text-success" />
                      Order return right in 7 days
                    </h6>
                    <hr />
                    <div className="price_detail">
                      <p className="total">Total Amount</p>
                      <p className="price total">{priceWithDelivery} TND</p>
                    </div>

                    <button
                      onClick={() => processPayment()}
                      className="orderBtn"
                      type="submit"
                    >
                      PAY NOW
                      <PaymentIcon className="ms-2 fs-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="d-flex flex-column align-items-center justify-content-center">
              <img
                className="img_fluid"
                style={{ width: "20%", height: "auto" }}
                src={noItems}
              />
              <h4 className="">Oops... No items in your bag</h4>
            </div>
          </>
        )}
      </div>
      {/*dialog*/}
      {open && (
        <div>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
              Modify Delivery Address
              <br />
              <span style={{ fontSize: "smaller", color: "gray" }}>
                Your default address will be modified*
              </span>
            </DialogTitle>
            <DialogContent>
              <TextField
                onChange={(e) => setuserName(e.target.value)}
                autoFocus
                margin="dense"
                id="name"
                label="Customer Name*"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={user.userName}
              />
              <TextField
                onChange={(e) => setAddress(e.target.value)}
                autoFocus
                margin="dense"
                id="name"
                label="Address*"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={user.address}
              />
              <TextField
                onChange={(e) => setCity(e.target.value)}
                autoFocus
                margin="dense"
                id="name"
                label="City*"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={user.city}
              />
              <TextField
                onChange={(e) => setPhone(e.target.value)}
                autoFocus
                margin="dense"
                id="name"
                label="Phone*"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={user.phone}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                onClick={() => {
                  handleClose();
                  modifAddress();
                }}
              >
                Save Address
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
      {/*snackbar*/}
      <SnackbarPop
        text={"Item deleted from your bag"}
        open={isOpen.open}
        close={handleCloseSnack}
      />
    </>
  );
}

export default PurshaseList;
