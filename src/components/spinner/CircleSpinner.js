import React from 'react';
import "./Spinner.css";
import ReactLoading from 'react-loading';
import { useSelector } from 'react-redux';

function CircleSpinner() {
  const theme = useSelector(state=>state.auth.theme);
  return (
    <div className={`spinner-container ${theme}`}>
      <ReactLoading type={"spin"} color={"var(--pink)"} height={50} width={50}/>
    </div>
  )
}

export default CircleSpinner