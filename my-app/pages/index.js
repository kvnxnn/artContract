import Head from "next/head";
import Image from "next/image";
import FeauturedCompont from "@/pageComponents/components/FeauturedCompont";
import Artlistcomponent from "@/pageComponents/components/Artlistcomponent";
import Loader from "@/pageComponents/components/Loader";
import { ethers } from "ethers";
import { useState, useEffect } from "react";

// internal import
import { useStateContext } from "@/context";

export default function Home() {
  const [arts, setArts] = useState([]);
  const [loadingg, setLoadingg] = useState(false);
  const [featuredArt, setFeaturedArt] = useState(null);
  const [loadingFeatured, setLoadingFeatured] = useState(false);

  const {
    address,
    connectWallet,
    disconnectWallet,
    contract,
    loading,
    handleListArt,
    getAllArtsData
  } = useStateContext();

  // fetchdata

  const fetchArt = async () => {
    setLoadingg(true);
    const data = await getAllArtsData();
    setArts(data);

    // Select a random art piece
    if (data.length > 0) {
      setLoadingFeatured(true);
      const randomIndex = Math.floor(Math.random() * data.length);
      setFeaturedArt(data[randomIndex]);
      setLoadingFeatured(false);
    }

    setLoadingg(false);
  };

  useEffect(() => {
    if (contract) fetchArt();
  },[address,contract]);

  return (
    <>
      {loadingg ? (
        <Loader /> // Show loader while fetching data
      ) : (
        <>
          {featuredArt && !loadingFeatured ? (
            <FeauturedCompont art={featuredArt} />
          ) : (
            <Loader /> // Show loader while selecting featured art
          )}
        </>
      )}
      <Artlistcomponent arts={arts} />
    </>
  );
}
