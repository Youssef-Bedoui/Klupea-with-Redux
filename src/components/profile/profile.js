import React, { useState, useEffect } from "react";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "../Reusable/Navs/Main_Nav/Nav";
import Orders_sec from "./Orders_sec";
import Personal_Info from "./Personal_Info";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import axios from "axios";
import Footer from "./../Reusable/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAccount, getItemsInBagNum, signOut } from "../../redux/features/authSlice";

axios.defaults.withCredentials = true;

function Profile() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.auth.theme);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const successDeleteAccount = useSelector(
    (state) => state.auth.successDeleteAccount
  );
  const navigate = useNavigate();
  const [active, setIsActive] = useState("Profile");
  const [showLogOutPop, setShowLogOutPop] = useState(false);
  const [deleteAccountPopUp, setDeleteAccountPopUp] = useState(false);

  const handleLogOut = () => {
    dispatch(signOut());
    dispatch(getItemsInBagNum());
  };

  const deleteAccount = () => {
    dispatch(deleteUserAccount({ userID: user.id }));
  };

  const showSuccessDeleteAccount = () => {
    toast.success("Your account Deleted, Sorry to see you go...", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  useEffect(() => {
    const links = document.querySelectorAll(".list-group-item");
    links.forEach((link) => {
      link.addEventListener("click", function () {
        links.forEach((e) => {
          e.classList.remove("active");
        });
        this.classList.add("active");
      });
    });
  }, []);

  useEffect(() => {
    if (successDeleteAccount) {
      showSuccessDeleteAccount();
    }
    if(isAuthenticated===false){
      navigate("/");
    }
  }, [dispatch, isAuthenticated, navigate, successDeleteAccount]);

  return (
    <div className={`profile ${theme}`}>
      <Nav />
      {/*Logout popup*/}
      <Popup
        open={showLogOutPop}
        position="right center"
        className="WishModalSuccess"
        onClose={() => setShowLogOutPop(false)}
      >
        <div className="d-flex flex-column justify-content-center align-items-center text-center">
          <div className="fw-bold mb-2 text-warning fs-1">
            <ReportGmailerrorredIcon fontSize="large" />
          </div>
          <h5>You want to Logout ?</h5>
          <div className="d-flex justify-content-around m-3">
            <Button
              onClick={()=>handleLogOut()}
              className="me-2"
              color="error"
              variant="contained"
              size="small"
            >
              <LogoutIcon /> Logout
            </Button>
            <Button
              onClick={() => {
                navigate("/");
              }}
              variant="contained"
              size="small"
            >
              Stay
            </Button>
          </div>
        </div>
      </Popup>
      {/*Delete Account popup*/}
      <Popup
        open={deleteAccountPopUp}
        position="right center"
        className="WishModalSuccess"
        onClose={() => setDeleteAccountPopUp(false)}
      >
        <div className="d-flex flex-column justify-content-center align-items-center text-center">
          <div className="fw-bold mb-2 text-warning fs-1">
            <ReportGmailerrorredIcon fontSize="large" />
          </div>
          <h5>Your Account will be deleted permanently !</h5>
          <div className="d-flex justify-content-around m-3">
            <Button
              onClick={()=>deleteAccount()}
              className="me-2"
              color="error"
              variant="contained"
              size="small"
            >
              <PersonOffIcon /> DELETE ACCOUNT
            </Button>
            <Button
              onClick={() => {
                navigate("/");
              }}
              variant="contained"
              size="small"
            >
              CANCEL
            </Button>
          </div>
        </div>
      </Popup>

      {/*Left_Nav Section*/}
      <div className="row">
        <div className=" col-lg-3 col-md-3 mt-3 vh-lg-100">
          <nav id="sidebarMenu" class="sidebar">
            <div class="list-group list-group-flush mx-lg-0">
              <a
                onClick={() => {
                  setIsActive("Profile");
                }}
                href="#"
                class="list-group-item list-group-item-action py-2 ripple active"
                aria-current="true"
              >
                <i class="fas fa-user fa-fw me-2"></i>
                <span>Your Account</span>
              </a>
              <a
                onClick={() => {
                  setIsActive("Orders");
                }}
                href="#"
                class="list-group-item list-group-item-action py-2 ripple"
              >
                <i class="fas fa-archive fa-fw me-2"></i>
                <span>Your Orders</span>
              </a>
              <a
                onClick={() => setDeleteAccountPopUp(true)}
                href="#"
                class="list-group-item list-group-item-action py-2 ripple"
              >
                <i class="fas fa-user-times fa-fw me-2"></i>
                <span>Delete Account</span>
              </a>
              <a
                onClick={() => {
                  setShowLogOutPop(true);
                }}
                href="#"
                class="list-group-item list-group-item-action py-2 ripple"
              >
                <i class="fas fa-sign-out fa-fw me-2"></i>
                <span>Log out</span>
              </a>
            </div>
          </nav>
        </div>
        {/*Profile section*/}
        {active === "Profile" && <Personal_Info userData={user} />}
        {/*orders section*/}
        {active === "Orders" && <Orders_sec />}
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
