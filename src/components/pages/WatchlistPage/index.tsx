import { Col, Container, Row } from "react-bootstrap";
import "./style.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IWatchlistDetailed } from "../../../interfaces/IWatchlist";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IColor, colorToRgba, getAverageColorFromImage } from "../../../tools";
import { format } from "date-fns";
import { IUser } from "../../../interfaces/IUser";
import {
  BsHeart,
  BsHeartFill,
  BsFillPencilFill,
  BsCheckSquareFill,
  BsTrash3Fill,
} from "react-icons/bs";
import { FaSkullCrossbones } from "react-icons/fa";
import { MdPersonAddAlt1 } from "react-icons/md";
import BG from "../../reusables/BG";
import MovieCard from "../../reusables/MovieCard";
import DiscoverMoreCard from "../../reusables/DiscoverMoreCard";
import WLModal from "../../modals/WLModal";
import PeopleModal from "../../modals/PeopleModal";
import NavCustom from "../../Nav";

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
  const [isDeleting, setIsDeleting] = useState(false);
  const [name, setName] = useState("");
  const [primColor, setPrimColor] = useState("");
  const loggedInUserID = localStorage.getItem("loggedInUserID");
  const navigate = useNavigate();
  const [showWLModal, setShowWLModal] = useState(false);
  const [showPeopleModal, setShowPeopleModal] = useState(false);
  const [movieIDToSave, setMovieIDToSave] = useState("");
  const [members, setMembers] = useState([]);

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
        setMembers(data.members);
        setIsMember(data.members.some((m: IUser) => m._id === loggedInUserID));
        setIsLiked(data.likes.some((id: string) => id === loggedInUserID));
        setName(data.name);
        document.title = `What ai Movie | ${data.name}`;
        const avColor = await getAverageColorFromImage(data.cover);
        setPrimColor(colorToRgba(avColor as IColor));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(String(error));
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
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(String(error));
    }
  };

  useEffect(() => {
    getWatchlist();
    // eslint-disable-next-line
  }, [watchlistID]);

  const editWL = async () => {
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
        toast.success("Watchlist succesfully edited!");
        setIsEditing(false);
        setWL((prev) => {
          if (prev) {
            return { ...prev, name: data.name };
          }
          return prev;
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(String(error));
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
        toast.success("Movie successfully removed from the wathclist!");
        getWatchlist();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(String(error));
    }
  };

  const addMemberToWL = async (userID: string) => {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    const URL = `${process.env.REACT_APP_API_URL}/watchlists/${watchlistID}/members/${userID}`;
    try {
      const res = await fetch(URL, options);
      const data = await res.json();
      if (res.ok) {
        getWatchlist();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(String(error));
    }
  };

  const deleteWL = async (WLID: string) => {
    try {
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };
      const URL = `${process.env.REACT_APP_API_URL}/watchlists/${WLID}`;
      const res = await fetch(URL, options);
      if (res.ok) {
        toast.success("Watchlist successfully deleted!");
        navigate("/user/me");
      } else {
        const data = await res.json();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(String(error));
    }
  };

  return (
    <>
      <NavCustom />
      <Container id="watchlist-page" className="topnav-fix">
        {WL && (
          <>
            <BG colors={[primColor, "#121212"]} to="bottom" />
            <Row className="mb-4 pb-4 justify-content-center">
              <Col
                xs={12}
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
                    <>
                      {isEditing ? (
                        <button
                          type="button"
                          className="mx-auto mx-md-0"
                          onClick={() => {
                            editWL();
                          }}
                        >
                          Save <BsCheckSquareFill className="ml-2" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="mx-auto mx-md-0"
                          onClick={() => {
                            setIsEditing(!isEditing);
                          }}
                        >
                          Edit <BsFillPencilFill className="ml-2" />
                        </button>
                      )}
                      {isDeleting ? (
                        <div className="delete-wrapper justify-content-center justify-content-md-start">
                          <button
                            style={{
                              backgroundColor: "red",
                              color: "#000",
                              borderColor: "#000",
                            }}
                          >
                            Sure? <FaSkullCrossbones className="ml-2" />
                          </button>
                          <button
                            onClick={() => {
                              deleteWL(WL._id);
                            }}
                          >
                            YES
                          </button>
                          <button
                            onClick={() => {
                              setIsDeleting(false);
                            }}
                          >
                            NO
                          </button>
                        </div>
                      ) : (
                        <button
                          className="mx-auto mx-md-0"
                          onClick={() => {
                            setIsDeleting(!isDeleting);
                          }}
                        >
                          Delete <BsTrash3Fill className="ml-2" />
                        </button>
                      )}
                      <button
                        className="mx-auto mx-md-0"
                        onClick={() => {
                          setShowPeopleModal(!showPeopleModal);
                        }}
                      >
                        Add Member
                        <MdPersonAddAlt1 className="ml-2" fontSize="1.3rem" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={likeOrDislike}
                    className="mx-auto mx-md-0 justify-content-around"
                  >
                    {isLiked ? (
                      <span className="d-flex align-items-center">
                        Dislike <BsHeartFill className="ml-2" />
                      </span>
                    ) : (
                      <span>
                        Like <BsHeart className="ml-2" />
                      </span>
                    )}
                    <span> | </span>
                    <span>{WL.likes?.length}</span>
                  </button>
                </div>
              </Col>
            </Row>
            <WLModal
              showWLModal={showWLModal}
              setShowWLModal={setShowWLModal}
              movieID={movieIDToSave}
            />
            <PeopleModal
              showPeopleModal={showPeopleModal}
              setShowPeopleModal={setShowPeopleModal}
              addMemberToWL={addMemberToWL}
              members={members}
            />
            <Row xs={1} md={3} lg={5} className="pt-3 justify-content-center">
              {WL.movies
                .slice()
                .reverse()
                .map(
                  (movie) =>
                    movie && (
                      <MovieCard
                        key={movie._id}
                        movie={movie}
                        isMember={isMember}
                        removeFromWL={removeFromWL}
                        setMovieIDToSave={setMovieIDToSave}
                        setShowWLModal={setShowWLModal}
                        saveable
                      />
                    )
                )}
              <DiscoverMoreCard />
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default WatchlistPage;
