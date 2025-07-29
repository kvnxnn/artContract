import React from "react";
import Image from "next/image";
import Link from "next/link";
const Art = ({ art }) => {
  return (
    <div>
      <div className="artwork">
        <img src={art.artImage} alt="artimage" />
      </div>
    </div>
  );
};

export default Art;
