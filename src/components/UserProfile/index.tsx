import { useParams } from "react-router-dom";
import "./style.css";
import { useEffect, useState } from "react";
import { IUser } from "../../interfaces/IUser";
import { toast } from "react-toastify";
import { Col, Container, Row } from "react-bootstrap";
import { GoVerified } from "react-icons/go";
import { AiFillLike } from "react-icons/ai";
import { MdLocalMovies } from "react-icons/md";
import { useAppSelector } from "../../redux/hooks";
import { ThreeDots } from "react-loader-spinner";
import WLCardHorizontal from "../reusables/WLCardHorizontal";

const UserProfile = () => {
  const loggedInUser = useAppSelector((st) => st.store.user);
  const { userID } = useParams();
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState({ is: false, message: "" });
  const [isMe, setIsMe] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showWLs, setShowWLs] = useState(true);

  const getUser = async () => {
    try {
      setLoading(true);
      const options = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };
      const URL = `${process.env.REACT_APP_API_URL}/users/${userID}`;
      const res = await fetch(URL, options);
      const data = await res.json();
      if (res.ok) {
        setUser(data);
        setIsFollowing(loggedInUser.following?.includes(data?._id));
      } else {
        setError({ is: true, message: data.message });
        toast.error(isError.message);
      }
    } catch (error) {
      setError({ is: true, message: String(error) });
      toast.error(isError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userID === "me") setIsMe(true);
    else setIsMe(false);
    getUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Container id="user-profile" className="topnav-fix">
      <Row className="justify-content-center">
        <Col
          xs={12}
          md={6}
          className="d-flex flex-column flex-lg-row align-items-center"
        >
          <div className="avatar-wrapper mr-lg-5">
            <img
              src={
                user
                  ? user.avatar
                  : "https://res.cloudinary.com/yasirdev/image/upload/v1682762639/WhataMovie/users/avatars/user_default.jpg"
              }
              alt="user avatar"
              className="w-100"
            />
          </div>
          <div className="d-flex flex-column ml-0 ml-lg-4 align-items-center align-items-lg-start">
            <div className="d-flex align-items-center">
              <h2 className="mb-0">
                {user ? `${user.name} ${user.surname}` : "John Doe"}
              </h2>
              {user?.verified ? (
                <GoVerified
                  style={{
                    fontSize: "1.5rem",
                    color: "green",
                  }}
                  className="ml-2"
                />
              ) : (
                ""
              )}
            </div>
            <div className="d-flex my-2">
              <button>
                <p className="mb-0 mr-3">
                  <strong>{user?.followers.length}</strong> Followers
                </p>
              </button>
              <button>
                <p className="mb-0">
                  <strong>{user?.following.length}</strong> Following
                </p>
              </button>
            </div>
            {!isMe && (
              <>
                {isFollowing ? (
                  <button className="f-u-e">Unfollow</button>
                ) : (
                  <button className="f-u-e">Follow</button>
                )}
              </>
            )}
            {isMe && <button className="f-u-e">Edit Profile</button>}
          </div>
        </Col>
      </Row>
      <Row className="mt-3 mt-lg-5 justify-content-center">
        <Col
          xs={12}
          md={8}
          className="d-flex"
          style={{ borderBlockEnd: "1px solid #eef7ff8f" }}
        >
          <button
            className={`wl-li ${showWLs && "active"}`}
            onClick={() => {
              setShowWLs(true);
            }}
          >
            Watchlists
            <MdLocalMovies className="ml-2" style={{ fontSize: "1.3rem" }} />
          </button>
          <button
            className={`wl-li ${!showWLs && "active"}`}
            onClick={() => {
              setShowWLs(false);
            }}
          >
            Likes <AiFillLike className="ml-2" style={{ fontSize: "1.3rem" }} />
          </button>
        </Col>
        {isLoading && (
          <Col xs={12} className="d-flex mt-3">
            <ThreeDots
              height="80"
              width="80"
              radius="8"
              color="#fefefe"
              wrapperClass="mx-auto"
              wrapperStyle={{ marginTop: "2vh" }}
              visible={true}
            />
          </Col>
        )}
        <Col xs={12} md={8} className="d-flex mt-3">
          {showWLs ? (
            <div className="d-flex flex-column w-100">
              {user?.watchlists.map(
                (wl) => wl && <WLCardHorizontal key={wl._id} WL={wl} />
              )}
            </div>
          ) : (
            <div className="d-flex flex-column w-100">
              {user?.likedWatchlists.map(
                (wl) => wl && <WLCardHorizontal key={wl._id} WL={wl} />
              )}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
