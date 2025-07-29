import React from "react";
import Art from "./Art";
import Link from "next/link";

const Artlistcomponent = ({ arts }) => {
  return (
    <div>
      <div className="artlist">
        <h1>Artists Works</h1>
        <div className="artistWorklist">
          {arts.map((art, i) => (
            <Link key={art.artID} href={`/detail/${art.artID}`}>
              <Art art={art} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artlistcomponent;
