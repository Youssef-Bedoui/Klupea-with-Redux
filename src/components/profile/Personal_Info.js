import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { modifyUserAddress } from "../../redux/features/authSlice.js";
import { useEffect } from "react";

function Personal_Info() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const successAddressModif = useSelector(
    (state) => state.auth.successAddressModif
  );

  const [isModifying, setIsModifying] = useState(false);
  const [userName, setUserName] = useState(user?.userName);
  const [address, setAddress] = useState(user?.address);
  const [city, setCity] = useState(user?.city);
  const [phone, setPhone] = useState(user?.phone);
  const [orders, setOrders] = useState([]);

  const showFailMessage = () => {
    toast.error("Address Modification Failed !");
  };
  const showSuccessMessage = () => {
    toast.success("Address Modified Successfully !");
  };

  const modifyAddress = async () => {
    dispatch(modifyUserAddress({userID:user.id, userName, address, city, phone }));
  };

  useEffect(() => {
    if (successAddressModif===true) {
      setIsModifying(false);
      showSuccessMessage();
    }
    if (successAddressModif===false) {
      showFailMessage();
    }
  }, [dispatch, successAddressModif,user]);

  return (
    <div className="col-lg-9 col-md-9 col-12">
      <div>
        <ToastContainer />
      </div>
      <div className="personal_info border p-3 my-3 mt-3">
        <p className="fw-bold mt-3">PERSONAL INFORMATION</p>
        <hr />
        <p className="name">{user?.userName}</p>
        <p className="email">{user?.email}</p>
      </div>
      <div className="personal_info border p-3 my-3">
        <div className="d-flex justify-content-between align-items-center pb-0 mt-3">
          <p className="fw-bold m-0">ADDRESSES</p>
          {isModifying ? (
            <div
              onClick={modifyAddress}
              className="save d-flex justify-content-center align-items-center mt-2 text-success"
            >
              <i class="fa fa-check-square fs-2" aria-hidden="true"></i>
            </div>
          ) : (
            <i
              onClick={() => {
                setIsModifying(!isModifying);
              }}
              class="fa fa-pencil edit"
              aria-hidden="true"
            ></i>
          )}
        </div>
        <hr />
        <p className="name">{user?.userName}</p>
        <p>{isModifying ? "Modify Address" : "Default address :"}</p>

        {isModifying ? (
          <input
            className="address_inp"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            type="text"
            defaultValue={user?.userName ? user?.userName : null}
            placeholder="UserName"
          />
        ) : (
          <p className="m-0 def_address">{user?.userName}</p>
        )}
        {isModifying ? (
          <input
            className="address_inp"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            type="text"
            defaultValue={user?.address ? user?.address : null}
            placeholder="Address"
          />
        ) : (
          <p className="m-0 def_address">{user?.address}</p>
        )}
        {isModifying ? (
          <input
            className="address_inp"
            onChange={(e) => {
              setCity(e.target.value);
            }}
            type="text"
            defaultValue={user?.city ? user?.city : null}
            placeholder="City"
          />
        ) : (
          <p className="m-0 def_address">{user?.city}</p>
        )}
        {isModifying ? (
          <input
            className="address_inp"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            type="text"
            defaultValue={user?.phone ? user?.phone : null}
            placeholder="Phone"
          />
        ) : (
          <p className="m-0 def_address">{user?.phone}</p>
        )}
      </div>
    </div>
  );
}

export default Personal_Info;
