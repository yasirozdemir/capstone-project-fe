import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import { useEffect, useState } from "react";
import { IUser, IUserDetailed } from "../../../interfaces/IUser";
import { toast } from "react-toastify";
import { Col, Container, Row } from "react-bootstrap";
import { GoVerified } from "react-icons/go";
import { ThreeDots } from "react-loader-spinner";
import WLCardHorizontal from "../../reusables/WLCardHorizontal";
import { IColor, colorToRgba, getAverageColorFromImage } from "../../../tools";
import PPModal from "../../modals/AvatarModal";
import { useAppSelector } from "../../../redux/hooks";
import EditProfile from "../../modals/EditProfile";
import BG from "../../reusables/BG";
import PeopleModal from "../../modals/PeopleModal";
import NavCustom from "../../reusables/Nav";

const UserProfile = () => {
  const loggedInUserID = localStorage.getItem("loggedInUserID");
  const loggedInUser = useAppSelector((st) => st.store.user);
  const navigate = useNavigate();
  const { userID } = useParams();
  const [user, setUser] = useState<IUserDetailed | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [isMe, setIsMe] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showWLs, setShowWLs] = useState(true);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [primColor, setPrimColor] = useState("");
  const [followers, setFollowers] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [showPeopleModal, setShowPeopleModal] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false); // if true show followers, otherwise show following

  const followFunc = async (userID: string | undefined, isFollow: boolean) => {
    try {
      if (userID === undefined) {
        toast.error("Something went wrong following this user!");
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
          setUser((prev) => {
            if (prev) {
              return { ...prev, followers: data.followers };
            }
            return prev;
          });
          setIsFollowing(isFollow);
          setFollowers(data.followers);
          setFollowingUsers(data.following);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(String(error));
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
        setIsFollowing(
          (data.followers as IUser[]).some((u) => u._id === loggedInUserID)
        );
        document.title = `What ai Movie | ${data.name} ${data.surname}`;
        const avColor = await getAverageColorFromImage(data.avatar);
        setPrimColor(colorToRgba(avColor as IColor));
        setFollowers(data.followers);
        setFollowingUsers(data.following);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(String(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userID === loggedInUserID) navigate("/user/me");
    if (userID === "me") {
      setIsMe(true);
    } else setIsMe(false);
    getUser();
    // eslint-disable-next-line
  }, [userID, loggedInUser]);

  useEffect(() => {
    setShowAvatarModal(false);
    setShowEditModal(false);
    setShowPeopleModal(false);
  }, [user]);

  return (
    <>
      <NavCustom />
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
            <BG colors={[primColor, "#121212"]} to="bottom" />
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
                        }}
                        className="ml-2 mt-3 mt-lg-0"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <PeopleModal
                    showFollowers={showFollowers}
                    showPeopleModal={showPeopleModal}
                    setShowPeopleModal={setShowPeopleModal}
                    followers={followers}
                    following={followingUsers}
                  />
                  <div className="d-flex my-2">
                    <button
                      onClick={() => {
                        setShowFollowers(true);
                        setShowPeopleModal(true);
                      }}
                    >
                      <p className="mb-0 mr-3">
                        <strong>{user?.followers.length}</strong> Followers
                      </p>
                    </button>
                    <button
                      onClick={() => {
                        setShowFollowers(false);
                        setShowPeopleModal(true);
                      }}
                    >
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
    </>
  );
};

export default UserProfile;
