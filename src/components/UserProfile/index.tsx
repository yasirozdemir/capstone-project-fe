import { useParams } from "react-router-dom";
import "./style.css";
import { useEffect, useState } from "react";
import { IUser } from "../../interfaces/IUser";
import { toast } from "react-toastify";
import { Col, Container, Row } from "react-bootstrap";
import { GoVerified } from "react-icons/go";
import { AiFillLike } from "react-icons/ai";
import { MdLocalMovies } from "react-icons/md";
import { ThreeDots } from "react-loader-spinner";
import WLCardHorizontal from "../reusables/WLCardHorizontal";
import { alertOptions } from "../../tools";
import PPModal from "../modals/AvatarModal";
import { useAppSelector } from "../../redux/hooks";

const UserProfile = () => {
  const loggedInUserID = localStorage.getItem("loggedInUserID");
  const loggedInUser = useAppSelector((st) => st.store.user);
  const { userID } = useParams();
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState({ is: false, message: "" });
  const [isMe, setIsMe] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showWLs, setShowWLs] = useState(true);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const followFunc = async (userID: string | undefined, isFollow: boolean) => {
    try {
      if (userID === undefined) {
        setError({
          is: true,
          message: "Something went wrong following this user!",
        });
        toast.error(isError.message, alertOptions);
      } else {
        const options = {
          method: isFollow ? "POST" : "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        };
        const URL = `${process.env.REACT_APP_API_URL}/users/follow/${userID}`;
        const res = await fetch(URL, options);
        const data = await res.json();
        if (res.ok) {
          toast.success(data.message, alertOptions);
          setUser((prev) => {
            if (prev) {
              return { ...prev, followers: data.followers };
            }
            return prev;
          });
          setIsFollowing(isFollow);
        } else {
          setError({ is: true, message: data.message });
          toast.error(isError.message, alertOptions);
        }
      }
    } catch (error) {
      setError({ is: true, message: String(error) });
      toast.error(isError.message, alertOptions);
    }
  };

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
        setIsFollowing(data.followers.includes(loggedInUserID));
        document.title = `What a Movie | ${data.name} ${data.surname}`;
      } else {
        setError({ is: true, message: data.message });
        toast.error(isError.message, alertOptions);
      }
    } catch (error) {
      setError({ is: true, message: String(error) });
      toast.error(isError.message, alertOptions);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userID === "me") {
      setIsMe(true);
      setShowAvatarModal(false);
    } else setIsMe(false);
    getUser();
    // eslint-disable-next-line
  }, [userID, loggedInUser]);

  return (
    <Container id="user-profile" className="topnav-fix">
      {isLoading ? (
        <Col xs={12} className="d-flex mt-3">
          <ThreeDots
            height="80"
            width="80"
            radius="8"
            color="#fefefe"
            wrapperClass="mx-auto"
            wrapperStyle={{ marginTop: "calc(50vh - 100px)" }}
            visible={true}
          />
        </Col>
      ) : (
        <>
          <Row className="justify-content-center">
            <Col
              xs={12}
              md={6}
              className="d-flex flex-column flex-lg-row align-items-center"
            >
              <div className={`avatar-wrapper mr-lg-5 ${isMe ? "me" : ""}`}>
                <img
                  src={
                    user
                      ? user.avatar
                      : "https://res.cloudinary.com/yasirdev/image/upload/v1682762639/WhataMovie/users/avatars/user_default.jpg"
                  }
                  alt="user avatar"
                  className="w-100"
                  onClick={() => {
                    if (isMe) setShowAvatarModal(!showAvatarModal);
                  }}
                />
                {isMe && (
                  <PPModal
                    showAvatarModal={showAvatarModal}
                    setShowAvatarModal={setShowAvatarModal}
                  />
                )}
              </div>
              <div className="d-flex flex-column ml-0 ml-lg-2 align-items-center justify-content-center align-items-lg-start">
                <div className="d-flex align-items-center">
                  <h2 className="mt-3 mt-lg-0 mb-0 text-center text-lg-left">
                    {user ? `${user.name} ${user.surname}` : "John Doe"}
                  </h2>
                  {user?.verified ? (
                    <GoVerified
                      style={{
                        fontSize: "1.2rem",
                        color: "green",
                      }}
                      className="ml-2 mt-3 mt-lg-0"
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
                      <button
                        className="f-u-e"
                        onClick={() => {
                          followFunc(user?._id, false);
                        }}
                      >
                        Unfollow
                      </button>
                    ) : (
                      <button
                        className="f-u-e"
                        onClick={() => {
                          followFunc(user?._id, true);
                        }}
                      >
                        Follow
                      </button>
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
                <MdLocalMovies
                  className="ml-2"
                  style={{ fontSize: "1.3rem" }}
                />
              </button>
              <button
                className={`wl-li ${!showWLs && "active"}`}
                onClick={() => {
                  setShowWLs(false);
                }}
              >
                Likes
                <AiFillLike className="ml-2" style={{ fontSize: "1.3rem" }} />
              </button>
            </Col>
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
        </>
      )}
    </Container>
  );
};

export default UserProfile;
