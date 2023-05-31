import React from 'react';
import "./Spinner.css";
import ReactLoading from 'react-loading';
import { useSelector } from 'react-redux';

function Spinner() {
  const theme = useSelector(state=>state.auth.theme);
  return (
    <div className={`spinner-container ${theme}`}>
      <ReactLoading type={"bars"} color={"var(--pink)"} height={50} width={100} black/>
    </div>
  )
}

export default Spinner