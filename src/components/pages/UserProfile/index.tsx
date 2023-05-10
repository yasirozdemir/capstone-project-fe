import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import { useEffect, useState } from "react";
import { IUser } from "../../../interfaces/IUser";
import { toast } from "react-toastify";
import { Col, Container, Row } from "react-bootstrap";
import { GoVerified } from "react-icons/go";
import { ThreeDots } from "react-loader-spinner";
import WLCardHorizontal from "../../reusables/WLCardHorizontal";
import {
  IColor,
  alertOptions,
  colorToRgba,
  getAverageColorFromImage,
} from "../../../tools";
import PPModal from "../../modals/AvatarModal";
import { useAppSelector } from "../../../redux/hooks";
import EditProfile from "../../modals/EditProfile";
import BG from "../../reusables/BG";

const UserProfile = () => {
  const loggedInUserID = localStorage.getItem("loggedInUserID");
  const loggedInUser = useAppSelector((st) => st.store.user);
  const navigate = useNavigate();
  const { userID } = useParams();
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState({ is: false, message: "" });
  const [isMe, setIsMe] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showWLs, setShowWLs] = useState(true);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [primColor, setPrimColor] = useState("");

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
        const avColor = await getAverageColorFromImage(data.avatar);
        setPrimColor(colorToRgba(avColor as IColor));
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
    if (userID === loggedInUserID) navigate("/user/me");
    if (userID === "me") {
      setIsMe(true);
      setShowAvatarModal(false);
      setShowEditModal(false);
    } else setIsMe(false);
    getUser();
    // eslint-disable-next-line
  }, [userID, loggedInUser]);

  return (
    <Container id="user-profile">
      {isLoading ? (
        <Col xs={12} className="d-flex">
          <ThreeDots
            height="80"
            width="80"
            radius="8"
            color="#fefefe"
            wrapperClass="mx-auto"
            wrapperStyle={{ marginTop: "5rem" }}
            visible={true}
          />
        </Col>
      ) : (
        <>
          <BG colors={[primColor, "#2E2E2E"]} to="bottom" />
          <Row className="justify-content-center py-4 py-lg-5">
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
                {isMe && (
                  <>
                    <button
                      className="f-u-e"
                      onClick={() => {
                        setShowEditModal(!showEditModal);
                      }}
                    >
                      Edit Profile
                    </button>
                    <EditProfile
                      showEditModal={showEditModal}
                      setShowEditModal={setShowEditModal}
                      setUser={setUser}
                    />
                  </>
                )}
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col
              xs={12}
              md={8}
              className="d-flex px-0"
              style={{ borderBlockEnd: "1px solid #ffffff9f" }}
            >
              <button
                className={`wl-li ${showWLs && "active"}`}
                onClick={() => {
                  setShowWLs(true);
                }}
              >
                Watchlists
              </button>
              <button
                className={`wl-li ${!showWLs && "active"}`}
                onClick={() => {
                  setShowWLs(false);
                }}
              >
                Likes
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
