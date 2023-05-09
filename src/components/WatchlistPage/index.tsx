import { Col, Container, Row } from "react-bootstrap";
import "./style.css";
import { Link, useParams } from "react-router-dom";
import { IWatchlistDetailed } from "../../interfaces/IWatchlist";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { alertOptions } from "../../tools";
import { format } from "date-fns";
import { IUser } from "../../interfaces/IUser";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { MdBookmarkRemove } from "react-icons/md";

function formatMembers(arr: Array<IUser>): JSX.Element[] {
  return arr
    .filter((m) => m)
    .map((m, i, arr) => (
      <React.Fragment key={m._id}>
        <Link to={"/user/" + m._id} className="member-link">
          {m.name} {m.surname}
        </Link>
        <span>{i !== arr.length - 1 && " ∙ "}</span>
      </React.Fragment>
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
        toast.success(
          isLiked ? `${WL?.name} disliked!` : `${WL?.name} liked!`,
          alertOptions
        );
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
        <>
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
          <Row xs={1} md={3} lg={5}>
            {WL.movies.map(
              (movie) =>
                movie && (
                  <Col
                    key={movie._id}
                    className="d-flex justify-content-center"
                  >
                    <div className="movie-card">
                      <div className="movie-card-body">
                        <Link to={`/movie/${movie._id}`}>
                          <img
                            src={movie.poster}
                            alt="movie cover"
                            className="img-fluid"
                          />
                          <div className="poster-overlay-detailed">
                            <i>{movie.title}</i>
                            <div>
                              {movie.genres.map((g, i) => (
                                <span key={i} className="genre-badge">
                                  {g}
                                </span>
                              ))}
                            </div>
                          </div>
                        </Link>
                        <div className="second-poster-overlay">
                          <button
                            onClick={() => {
                              console.log("heloWorld");
                            }}
                          >
                            <MdBookmarkRemove />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Col>
                )
            )}
          </Row>
        </>
      )}
    </Container>
  );
};

export default WatchlistPage;
