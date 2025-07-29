import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { ethers } from "ethers";
import { useStateContext } from "@/context";
import Loader from "./Loader";
import { formatBalance } from "@/constants";
const HeaderComponent = () => {
  const {
    address,
    disconnectWallet,
    contract,
    loading,
    connectWallet,
    userBlance
  } = useStateContext();

  return (
    <div>
      <div className="headerContainer">
        <div className="logo">
          <Link href="/">
            <h1>Arthub</h1>
          </Link>
        </div>

        <div className="coinbakance">
          <div className="balance">
            <h4>BALANCE</h4>
            <p>
              {userBlance !== null
                ? `${formatBalance(userBlance)} MATIC`
                : "Loading..."}
            </p>
          </div>
          <img src="/arts/file.png" alt="coinimage" />
        </div>

        <div className="middleItems">
          <div className="createBtn ">
            <Link href="/create">
              <button className="btn">Create</button>
            </Link>
          </div>

          {loading ? (
            <Loader width={10} height={10} /> // Show loader if loading is true
          ) : address ? (
            <div className="signOutBtn">
              <button onClick={disconnectWallet} className="btn">
                Sign Out
              </button>
            </div>
          ) : (
            <div className="loginBtn">
              <button onClick={connectWallet} className="btn">
                Login
              </button>
            </div>
          )}

          <div className="profile">
            <Link href="/profile">
              <FontAwesomeIcon className="profileUser" icon={faUser} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
