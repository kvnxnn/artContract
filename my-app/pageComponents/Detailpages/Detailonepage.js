// import React from "react";
// import Loader from "../components/Loader";
// import { useRouter } from "next/router";
// import { useState, useEffect } from "react";
// import { useStateContext } from "@/context";
// const Detailonepage = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [art, setArt] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { getAllArtsData } = useStateContext();

//   useEffect(() => {
//     if (id) {
//       fetchArtDetails(id);
//     }
//   }, [id]);

//   const fetchArtDetails = async artID => {
//     const arts = await getAllArtsData();
//     const art = arts.find(art => art.artID === parseInt(artID));
//     setArt(art);
//     setLoading(false);
//   };

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     art && (
//       <div className="featured">
//         <div className="imageContainer">
//           <img src={art.artImage} alt="artimage" />
//         </div>
//         <div className="rightItems">
//           <h1>{art.artTitle}</h1>
//           <div className="description">
//             <div className="profile">
//               <p>Owner:</p>
//               <div>{art.owner}</div>
//             </div>
//             <small className="description">{art.artDescription}</small>
//           </div>
//           <small className="price">{art.artPrice} MATIC</small>
//           <button className="buyArtBtn">Buy Now</button>
//         </div>
//       </div>
//     )
//   );
// };
// export default Detailonepage;
