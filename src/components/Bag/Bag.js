import React, { useState } from "react";
import "./Bag.css";
import PurshaseList from "./PurshaseList.js";
import Nav from "../Reusable/Navs/Main_Nav/Nav";
import NotConnectedPop from "../Reusable/NotConnectedPop/NotConnectedPop";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Footer from "../Reusable/Footer/Footer";




function Bag() {
    const navigate = useNavigate();
     const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
     const theme = useSelector(state => state.auth.theme);

    //modal 
    const [showAlert, setShowAlert] = useState(isAuthenticated ? false : true);


    return (
        <div className={`Bag ${theme}`}>
            <Nav />
            {isAuthenticated ? (<div className="bag_main">
                <PurshaseList />
                <Footer/>
            </div>) : (
                <NotConnectedPop theme={theme} showAlert={showAlert} navigate={navigate} />
            )}
        </div>
    )
}

export default Bag;