import { Col, Container, Row } from "react-bootstrap";
import "./style.css";
import { Link, useParams } from "react-router-dom";
import { IWatchlistDetailed } from "../../interfaces/IWatchlist";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { alertOptions } from "../../tools";
import { format } from "date-fns";
import { IUser } from "../../interfaces/IUser";
import { BsHeart, BsHeartFill } from "react-icons/bs";

function formatMembers(arr: Array<IUser>): JSX.Element[] {
  return arr
    .filter((m) => m)
    .map((m, i, arr) => (
      <Link to={"/user/" + m._id} key={m._id} className="member-link">
        {m.name} {m.surname}
        {i !== arr.length - 1 && " ∙ "}
      </Link>
    ));
}

const WatchlistPage = () => {
  const { watchlistID } = useParams();
  const [WL, setWL] = useState<IWatchlistDetailed | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const loggedInUserID = localStorage.getItem("loggedInUserID");

  const getWatchlist = async () => {
    const options = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    const URL = `${process.env.REACT_APP_API_URL}/watchlists/${watchlistID}`;
    try {
      const res = await fetch(URL, options);
      const data = await res.json();
      if (res.ok) {
        setWL(data);
        setIsMember(data.members.some((m: IUser) => m._id === loggedInUserID));
        setIsLiked(data.likes.some((id: string) => id === loggedInUserID));
      } else {
        toast.error(data.message, alertOptions);
      }
    } catch (error) {
      toast.error(String(error), alertOptions);
    }
  };

  const likeOrDislike = async () => {
    const options = {
      method: isLiked ? "DELETE" : "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    const URL = `${process.env.REACT_APP_API_URL}/watchlists/${watchlistID}/likes`;
    try {
      const res = await fetch(URL, options);
      const data = await res.json();
      if (res.ok) {
        setWL((prev) => {
          if (prev) {
            return { ...prev, likes: data };
          }
          return prev;
        });
        setIsLiked(!isLiked);
      } else {
        toast.error(data.message, alertOptions);
      }
    } catch (error) {
      toast.error(String(error), alertOptions);
    }
  };

  useEffect(() => {
    getWatchlist();
    // eslint-disable-next-line
  }, [watchlistID]);

  return (
    <Container id="watchlist-page" className="topnav-fix">
      {WL && (
        <Row>
          <Col>
            <div className="cover-wrapper">
              <img
                src={WL.cover}
                alt="cover"
                className="img-fluid"
                style={{ aspectRatio: 1 }}
              />
            </div>
            <h2 className="m-0">{WL.name}</h2>
            <span>{format(new Date(WL.createdAt), "MMM yyyy")}</span>
            <span>{formatMembers(WL.members)}</span>
            <button onClick={likeOrDislike}>
              <span>{WL.likes?.length}</span>
              {isLiked ? (
                <span>
                  Dislike <BsHeartFill />
                </span>
              ) : (
                <span>
                  Like <BsHeart />
                </span>
              )}
            </button>

            {isMember && <button>Edit</button>}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default WatchlistPage;
