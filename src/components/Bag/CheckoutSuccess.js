import React from "react";
import { useEffect, useState } from "react";
import config from "../../config.json";
import axios from "axios";
import Nav from "../Reusable/Navs/Main_Nav/Nav";
import ReactJsAlert from "reactjs-alert";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function CheckoutSuccess() {
  const navigate = useNavigate();

  const user = useSelector(state=>state.auth.user);

  let userID = user.id;
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    const orderID = localStorage.getItem("orderID");
    console.log(orderID, "orderid");
    axios
      .all([
        axios.post(`${config.SERVER_URL}/orders/placeOrderToUser/${userID}`, {
          orderID,
        }),
        axios.delete(`${config.SERVER_URL}/bag/emptyBag/${userID}`),
      ])
      .then(
        axios.spread(() => {
          console.log("Order placed and bag emptied");
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="payment_container">
      <Nav />

      <ReactJsAlert
        status={isShow} // true or false
        type="success" // success, warning, error, info
        title="Payed Successfully !"
        Close={() => {
          setIsShow(false);
          navigate("/");
        }}
        quotes="true"
        quote="*** Thank you for visiting Klupea ***"
        button="Go to Home"
      />
    </div>
  );
}

export default CheckoutSuccess;
