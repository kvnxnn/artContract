import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { formatAddress } from "@/constants";
import { useStateContext } from "@/context";
import Link from "next/link";
const FeauturedCompont = ({ art }) => {
  const {
    buyArtFunction,
    errorMessage,
    showError,
    setShowError,
    setErrorMessage,
    address,
    userBlance
  } = useStateContext();
  // const [showError, setShowError] = useState(false);

   const [localErrorMessage, setLocalErrorMessage] = useState("");

  const handleBuyArt = async () => {
    setLocalErrorMessage(""); // Clear previous error message
    try {
      if (art.owner === address) {
        setLocalErrorMessage("You cannot buy your own art");
        setShowError(true);
        return;
      }

       if (parseFloat(userBlance) < parseFloat(art.artPrice)) {
         setLocalErrorMessage("Insufficient funds to buy this art");
         setShowError(true);
         return;
       }

      await buyArtFunction({
        artID: art.artID,
        amount: art.artPrice,
        artOwner: art.owner
      });
    } catch (error) {
      setShowError(true);
      setLocalErrorMessage("Buy failed");
      console.error("Buy fail", error);
    }
  };

  useEffect(() => {
    if (localErrorMessage) {
      setShowError(true);
    }
  }, [localErrorMessage]);

  const isOwner = address && address.toLowerCase() === art.owner.toLowerCase();
  return (
    <div>
      <div className="featured">
        <div className="imageContainer">
          <img src={art.artImage} alt="artimage" />
        </div>

        <div className="rightItems">
          <h2>Feautured</h2>
          <h1>{art.artTitle}</h1>

          <div className="description">
            <div className="profile">
              <p>Creator:</p>
              <Link href={`/profile?address=${art.owner}`}>
                <div>{formatAddress(art.owner)}</div>
              </Link>
            </div>
            <small className="description">{art.artDescription}</small>
          </div>

          <small className="price">{art.artPrice} MATIC</small>
          {!isOwner && (
            <button onClick={handleBuyArt} className="buyArtBtn">
              Buy Now
            </button>
          )}
          {showError && localErrorMessage && (
            <div style={{ color: "red" }}>{localErrorMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeauturedCompont;
