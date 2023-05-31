import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Spinner from "./../spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/features/ordersSlice";

function Orders_sec() {
    const dispatch = useDispatch();
  const theme = useSelector((state) => state.auth.theme);
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.orders.loading);
  const fetchedOrders = useSelector((state) => state.orders.orders);
  const userID = user.id;

  useEffect(() => {
    dispatch(getOrders({userID}))
  }, [dispatch, userID]);

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="col mx-3">
        <div className="orders border p-3 my-3">
          <p className="fw-bold">YOUR ORDERS</p>
          <hr />
          {fetchedOrders.length ? (
            fetchedOrders.map((order, index) => {
              return (
                <List
                  sx={{
                    width: "100%",
                    bgcolor:
                      theme === "light"
                        ? "background.paper"
                        : "background.secondary",
                  }}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={order.image} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={order.name + " | " + order.price + " TND"}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color={theme === "light" ? "text.primary" : "white"}
                          >
                            Order #{order.orderID.slice(26, 37)}
                            {` —  ${order.paymentDate}`}
                          </Typography>
                          <Typography
                            sx={{ display: "block" }}
                            component="span"
                            variant="body3"
                            color={
                              order.orderStatus === "Preparing Order"
                                ? "warning.main"
                                : order.orderStatus === "Out To Deliver"
                                ? "primary.main"
                                : order.orderStatus === "Delivered"
                                ? "green"
                                : null
                            }
                          >
                            order status : {order.orderStatus}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </List>
              );
            })
          ) : (
            <div>
              <h3
                className="d-flex justify-content-center align-items-center fw-bold my-5"
                style={{ height: "50vh" }}
              >
                No orders yet !
              </h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Orders_sec;
