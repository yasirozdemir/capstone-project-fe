import { Link } from "react-router-dom";
import { IWatchlist } from "../../../interfaces/IWatchlist";
import "./style.css";
import { BsHeartFill } from "react-icons/bs";
import React from "react";

const WLCard = ({ WL }: props) => {
  return (
    <div className="wl-wrapper">
      <div className="cover-wrapper">
        <img src={WL.cover} alt="WL cover" className="w-100" />
      </div>
      <div className="ml-2">
        <Link to={`/watchlist/${WL._id}`}>
          <p className="mb-0">{WL.name}</p>
        </Link>
        {WL.members
          .filter((m) => m)
          .map((m, i, arr) => (
            <React.Fragment key={m._id}>
              <Link to={`/users/${m._id}`}>
                <small style={{ fontSize: "0.8rem" }}>
                  {m.name} {m.surname}
                </small>
              </Link>
              {i !== arr.length - 1 && ", "}
            </React.Fragment>
          ))}
      </div>
      <small className="ml-auto">
        {WL.likes.length} <BsHeartFill />
      </small>
    </div>
  );
};

interface props {
  WL: IWatchlist;
}

export default WLCard;
