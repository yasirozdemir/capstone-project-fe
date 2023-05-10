import { Col, Container, Row } from "react-bootstrap";
import "./style.css";
import { Link, useParams } from "react-router-dom";
import { IWatchlistDetailed } from "../../interfaces/IWatchlist";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { alertOptions } from "../../tools";
import { format } from "date-fns";
import { IUser } from "../../interfaces/IUser";
import {
  BsHeart,
  BsHeartFill,
  BsPencilSquare,
  BsCheckSquareFill,
} from "react-icons/bs";
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
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
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
        setName(data.name);
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

  const editWL = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    };
    const URL = `${process.env.REACT_APP_API_URL}/watchlists/${watchlistID}`;
    try {
      const res = await fetch(URL, options);
      const data = await res.json();
      if (res.ok) {
        toast.success("Watchlist succesfully edited!", alertOptions);
        setIsEditing(false);
        setWL((prev) => {
          if (prev) {
            return { ...prev, name: data.name };
          }
          return prev;
        });
      } else {
        toast.error(data.message, alertOptions);
      }
    } catch (error) {
      toast.error(String(error), alertOptions);
    }
  };

  const removeFromWL = async (movieID: string) => {
    try {
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };
      const URL = `${process.env.REACT_APP_API_URL}/watchlists/${watchlistID}/movies/${movieID}`;
      const res = await fetch(URL, options);
      const data = await res.json();
      if (res.ok) {
        toast.success(
          "Movie successfully removed from the wathclist!",
          alertOptions
        );
        getWatchlist();
      } else {
        toast.error(data.message, alertOptions);
      }
    } catch (error) {
      toast.error(String(error), alertOptions);
    }
  };

  return (
    <Container id="watchlist-page" className="topnav-fix">
      {WL && (
        <>
          <Row className="mb-5 pb-4 justify-content-center">
            <Col
              xs={12}
              md={8}
              className="d-flex justify-content-center align-items-center flex-column flex-md-row"
            >
              <div className="cover-wrapper mr-0 mr-md-3 mb-3 mb-md-0">
                <img
                  src={WL.cover}
                  alt="cover"
                  className="img-fluid"
                  style={{ aspectRatio: 1 }}
                />
              </div>
              <div className="d-flex flex-column WL-header text-center text-md-left">
                {isMember ? (
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className={
                      isEditing
                        ? "isEditing mx-auto mx-md-0"
                        : "mx-auto mx-md-0"
                    }
                  >
                    <input
                      type="text"
                      defaultValue={name}
                      disabled={!isEditing}
                      className="text-center text-md-left"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    {isEditing && (
                      <button type="submit" onClick={editWL}>
                        <BsCheckSquareFill />
                      </button>
                    )}
                  </form>
                ) : (
                  <h2 className="m-0">{WL.name}</h2>
                )}
                <span>
                  {formatMembers(WL.members)}
                  {" ~ "}
                  {format(new Date(WL.createdAt), "MMM yyyy")}
                </span>
                {isMember && (
                  <button
                    type="button"
                    className="mx-auto mx-md-0"
                    onClick={() => {
                      setIsEditing(!isEditing);
                    }}
                  >
                    Edit <BsPencilSquare />
                  </button>
                )}
                <button
                  onClick={likeOrDislike}
                  className="mx-auto mx-md-0 d-flex justify-content-around"
                >
                  {isLiked ? (
                    <span>
                      Dislike <BsHeartFill />
                    </span>
                  ) : (
                    <span>
                      Like <BsHeart />
                    </span>
                  )}
                  <span> | </span>
                  <span>{WL.likes?.length}</span>
                </button>
              </div>
            </Col>
          </Row>
          <Row xs={1} md={3} lg={5} className="justify-content-center">
            {WL.movies.map(
              (movie) =>
                movie && (
                  <Col
                    key={movie._id}
                    className="d-flex justify-content-center mb-3"
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
                        {isMember && (
                          <div className="second-poster-overlay">
                            <button
                              onClick={() => {
                                removeFromWL(movie._id);
                              }}
                            >
                              <MdBookmarkRemove />
                            </button>
                          </div>
                        )}
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
