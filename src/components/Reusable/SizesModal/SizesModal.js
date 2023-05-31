import React, { useState, useEffect } from "react";
import "./SizesModal.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToBag,
  closeSuccess,
  getProductSizes,
} from "../../../redux/features/bagSlice";
import SnackbarPop from "../snackbarPop/SnackbarPop";
import {
  decrementItemInBag,
  incrementItemInBag,
} from "../../../redux/features/authSlice";

function SizesModal(props) {
  // const { setItemsInBag } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    modalIsOpen,
    closeModal,
    size,
    setSize,
    quantity,
    setQuantity,
    links,
    productID,
    userID,
    handleSizeClick,
  } = props;

  const sizes = useSelector((state) => state.bag.sizes);
  const successOperation = useSelector((state) => state.bag.successOperation);
  const [showAlertBagSuccess, setShowAlertBagSuccess] = useState(false);

  const handleAdd = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
      dispatch(incrementItemInBag(1));
    }
  };

  const handleSubtrac = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      dispatch(decrementItemInBag(1));
    }
  };

  const addToBag = (navigation) => {
    if (size && size.length) {
      dispatch(
        addItemToBag({
          productID,
          orderSize: size,
          orderQuantity: quantity,
          userID,
        })
      ).then(() => {
        dispatch(incrementItemInBag(1));
        if (navigation === "GoToBag") {
          navigate("/bag");
        }
      });
    }
  };

  useEffect(() => {
    dispatch(getProductSizes({ productID }));
  }, [dispatch, productID]);

  useEffect(() => {
    if (successOperation === true) {
      closeModal();
      handleOpenSnack();
      setTimeout(() => {
        dispatch(closeSuccess());
        handleCloseSnack();
      }, 3000);
    }
  }, [closeModal, dispatch, showAlertBagSuccess, successOperation]);

  //snackbar
  const [openSnack, setOpenSnack] = useState({
    open: false,
    vertical: "top",
    horizontal: "left",
  });

  const handleOpenSnack = () => {
    setOpenSnack({ open: true, vertical: "top", horizontal: "left" });
  };

  const handleCloseSnack = () => {
    setOpenSnack({
      open: false,
      vertical: "top",
      horizontal: "left",
    });
  };
  return (
    <div>
      <SnackbarPop
        open={openSnack.open}
        onClose={handleCloseSnack}
        text={"ITEM ADDED TO BAG"}
      />
      <Popup
        open={modalIsOpen}
        onClose={closeModal}
        position="right center"
        className="modal"
      >
        <div className="d-flex justify-content-between align-items-center">
          <div className="fw-bold">Please select size and quantity </div>
          <span onClick={closeModal} className="fw-bold closeBtn fs-4">
            &times;
          </span>
        </div>
        <hr />
        <div className="fw-bold">
          <div className="d-flex justify-content-around align-items-center pt-lg-2 pt-0">
            {sizes.map((size, key) => {
              return (
                <p
                  ref={links.current[key]}
                  onClick={() => {
                    setSize(size.size);
                    handleSizeClick(key);
                  }}
                  className="size"
                >
                  {size.size}
                </p>
              );
            })}
          </div>
          <h4 className="text-center mt-2">Quantity :</h4>
          <div className="quantityBtns d-flex justify-content-center align-items-center mb-lg-3 mb-2">
            <button className="minBtn" onClick={() => handleSubtrac()}>
              <NavigateBeforeIcon />
            </button>
            <span className="quantity_num">{quantity}</span>
            <button
              disabled={false}
              className="addBtn"
              onClick={() => handleAdd()}
            >
              <NavigateNextIcon />
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-around align_items_center">
          <button
            onClick={() => {
              addToBag();
            }}
            className="btn keepBtn w-100 me-2"
          >
            KEEP SHOPPING
          </button>
          <button
            onClick={() => {
              addToBag("GoToBag");
            }}
            className="btn finishBtn w-100"
          >
            FINISH ORDER
          </button>
        </div>
      </Popup>
    </div>
  );
}

export default SizesModal;
