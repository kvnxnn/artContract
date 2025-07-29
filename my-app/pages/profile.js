import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Art from "@/pageComponents/components/Art";
import Loader from "@/pageComponents/components/Loader";
import { useStateContext } from "@/context";
import { formatAddress } from "@/constants";
import { formatBalance } from "@/constants";
import Link from "next/link";
const Profile = ({}) => {
  const {
    address: connectedAddress,
    connectWallet,
    disconnectWallet,
    contract,
    loading,
    userBlance,
    handleListArt,
    getAllArtsData
  } = useStateContext();

  const router = useRouter();
  const { address: queryAddress } = router.query;

  const [userArts, setUserArts] = useState([]);
  const [loadingArts, setLoadingArts] = useState(false);
   const [displayAddress, setDisplayAddress] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const address = queryAddress || connectedAddress;
      if (address) {
        setLoadingArts(true); // Start loading user arts
        try {
          const allArts = await getAllArtsData();
          const userOwnedArts = allArts.filter(
            art => art.owner.toLowerCase() === address.toLowerCase()
          );
          setUserArts(userOwnedArts);
          setDisplayAddress(address);
        } catch (error) {
          console.error("Error fetching user arts:", error);
        } finally {
          setLoadingArts(false); // Stop loading user arts
        }
      }
    };

    fetchUserData();
  }, [queryAddress, connectedAddress, getAllArtsData]);

  return (
    <div>
      <div className="profile">
        <div className="profileContainer">
          <div className="profileImg">
            <img
              src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/3bd59e126928981.6137cc3c8a3e7.png"
              alt="profile"
            />
            <p>{formatAddress(displayAddress)}</p>
            {/* <small>{formatBalance(userBlance)} MATIC</small> */}
          </div>

          <h3>Work</h3>

          {loadingArts ? (
            <Loader /> // Show loader while fetching data
          ) : (
            <div className="artistWorklistProfile">
              {userArts.map(art => (
                <Link key={art.artID} href={`/detail/${art.artID}`}>
                  <img src={art.artImage} alt="artImage" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
