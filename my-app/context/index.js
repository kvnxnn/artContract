import React, { useState, useEffect, useContext, createContext } from "react";
import contractAbi from "@/constants/contractAbi";
import {
  useAddress,
  useContract,
  useConnect,
  metamaskWallet,
  useContractWrite,
  useContractRead,
  useContractEvents,
  useDisconnect,
  useConnectionStatus,
  useSigner
} from "@thirdweb-dev/react";

import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract, error } = useContract(
    // smart contract address
    "0xD0f97f9d99D3aEB6a386F65021b8B68c0A2bAf6E",
    contractAbi
  );

  // for debugging purposes
  // useEffect(() => {
  //   if (contract) {
  //     console.log("Contract loaded:", contract);
  //   } else if (error) {
  //     console.error("Error loading contract:", error);
  //   }
  // }, [contract, error]);

  //   connect wallet:

  //   state variables
  const metamaskConfig = metamaskWallet();
  const address = useAddress();
  const connect = useConnect();
  const disconnect = useDisconnect();
  const art = "artstation";

  const signer = useSigner();
  // state

  const [userBlance, setuserBlance] = useState();
  const [loading, setLoading] = useState(false); // Add loading state
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  //   connect wallet
  const connectWallet = async () => {
    try {
      setLoading(true);
      const wallet = await connect(
        metamaskConfig,
        metamaskWallet({
          projectId: "6a454637451d5e0a315734649e7eaf1d",
          connectionMethod: "walletConnect",
          recommended: true
        })
      );
      console.log("connected to ", wallet);
      fetchUserBalance(); // after connecting wallet get user balance
    } catch (err) {
      console.error("Connection failed", err);
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      setLoading(true);
      await disconnect();
    } catch (err) {
      console.error("Disconnection failed", err);
    } finally {
      setLoading(false);
    }
  };

  // get address balance

  const fetchUserBalance = async () => {
    if (signer && address) {
      const balance = await signer.getBalance();
      const formattedBalance = ethers.utils.formatEther(balance);
      setuserBlance(formattedBalance);
    } else {
      setuserBlance(null);
    }
  };

  useEffect(() => {
    fetchUserBalance();
  }, [signer, address]);

  //  SMART CONTRACT  FUNCTIONS

  // 1. listart

  const { mutateAsync: listArt } = useContractWrite(contract, "listArt");

  const handleListArt = async form => {
    const { artTitle, artImage, artDescription, artPrice } = form;

    const gasPrice = ethers.utils.parseUnits("50", "gwei");

    try {
      const data = await listArt({
        args: [artTitle, artImage, artDescription, artPrice],
        overrides: {
          gasPrice: gasPrice
        }
      });

      console.info("contract call success", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  //  function ends

  // 2. getAllarts
  const getAllArtsData = async () => {
    try {
      // get all art data
      const arts = await contract.call("getAllArts");
      // get user balance
      const balance = await signer?.getBalance();

      const userBlance = address
        ? ethers.utils.formatEther(balance?.toString())
        : "";
      setuserBlance(userBlance);
      const parsedArts = arts.map((art, i) => ({
        artID: art.artID ? art.artID.toNumber() : 0, // Check if artID exists before calling toNumber()
        owner: art.owner,
        artTitle: art.artTitle,
        artImage: art.artImage,
        artDescription: art.artDescription,
        artPrice: ethers.utils.formatEther(art.artPrice.toString())
      }));

      return parsedArts;
    } catch (err) {
      console.log("Error while loading data", err);
    }
  };

  // 3. BUYART

  // BUY ART FUNCTION

  const { mutateAsync: buyArt } = useContractWrite(contract, "buyArt");

  const buyArtFunction = async buying => {
    const { artID, amount } = buying;
    const money = ethers.utils.parseEther(amount.toString());
    try {
      setLoading(true);
      const data = await buyArt({
        args: [artID],
        overrides: {
          value: money
        }
      });
      console.log("Transaction successful", data);
      window.location.reload();
    } catch (error) {
      setShowError(true);
      console.error("Buy fail", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        connectWallet,
        disconnectWallet,
        contract,
        loading,
        userBlance,
        errorMessage,
        showError,
        setShowError,
        setErrorMessage,
        handleListArt,
        getAllArtsData,
        buyArtFunction
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
