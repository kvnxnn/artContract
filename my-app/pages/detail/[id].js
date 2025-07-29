import React, { useEffect, useState } from "react";
import Loader from "@/pageComponents/components/Loader";
import { useRouter } from "next/router";
import { useStateContext } from "@/context";
import { formatAddress } from "@/constants";
import Link from "next/link";
const Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [art, setArt] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [showError, setShowError] = useState(false);
   const [localErrorMessage, setLocalErrorMessage] = useState("");

  const {
    getAllArtsData,
    buyArtFunction,
    errorMessage,
    showError,
    setShowError,
    setErrorMessage,
    address,
    userBlance
  } = useStateContext();

  useEffect(() => {
    const fetchArtDetails = async artID => {
      const arts = await getAllArtsData();
      const art = arts.find(art => art.artID === parseInt(artID));
      setArt(art);
      setLoading(false);
    };

    if (id) {
      fetchArtDetails(id);
    }
  }, [id, getAllArtsData]);

   useEffect(() => {
     if (localErrorMessage) {
       setShowError(true);
     }
   }, [localErrorMessage]);

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

  const isOwner =
    art && address && address.toLowerCase() === art.owner.toLowerCase();

  if (loading) {
    return <Loader />;
  }

  return (
    art && (
      <div className="featured">
        <div className="imageContainer">
          <img src={art.artImage} alt="artimage" />
        </div>
        <div className="rightItems">
          <h1>{art.artTitle}</h1>
          <div className="description">
            <div className="profile">
              <p>Owner:</p>
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
    )
  );
};

export default Detail;
