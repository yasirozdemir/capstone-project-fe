import { Link } from "react-router-dom";
import { IWatchlist } from "../../../interfaces/IWatchlist";
import "./style.css";
import { BsHeartFill } from "react-icons/bs";
import React from "react";

const WLCard = ({ WL }: props) => {
  return (
    <Link to={`/watchlist/${WL._id}`} className="wl-link">
      <div className="wl-wrapper">
        <div className="cover-wrapper">
          <img src={WL.cover} alt="WL cover" className="w-100" />
        </div>
        <div className="ml-2 d-flex flex-column">
          <strong>{WL.name}</strong>
          <small style={{ fontSize: "0.8rem" }}>
            {WL.members
              .filter((m) => m)
              .map((m, i, arr) => (
                <React.Fragment key={m._id}>
                  {m.name} {m.surname}
                  {i !== arr.length - 1 && ", "}
                </React.Fragment>
              ))}
          </small>
        </div>
        <small className="ml-auto">
          {WL.likes.length} <BsHeartFill />
        </small>
      </div>
    </Link>
  );
};

interface props {
  WL: IWatchlist;
}

export default WLCard;
