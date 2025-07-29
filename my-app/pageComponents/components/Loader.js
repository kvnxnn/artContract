import React from "react";

const Loader = ({ width, height }) => {
  return (
    <div className="loader-container">
      <div
        style={{
          width: width ?? "120px", 
          height: height ?? "120px" 
        }}
        className="loader"
      ></div>
    </div>
  );
};

export default Loader;
