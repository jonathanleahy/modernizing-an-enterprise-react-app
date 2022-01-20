import React from 'react';
import './Loader.css';

const Loader = (props) => {
  return (
    <span className="loader-wrapper">
      <div className="loader"></div>
      <p className="loading-message">{props.message}</p>
    </span>
  );
};

export default Loader;
