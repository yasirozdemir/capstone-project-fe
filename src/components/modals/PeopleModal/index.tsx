import { Modal } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";
import { IUser } from "../../../interfaces/IUser";
import UserCardHorizontal from "../../reusables/UserCardHorizontal";
import { useState } from "react";

interface props {
  showPeopleModal: boolean;
  setShowPeopleModal: Function;
  showFollowers?: boolean;
  followers?: IUser[];
  following?: IUser[];
  addMemberToWL?: Function;
  members?: IUser[];
}

const PeopleModal = ({
  showPeopleModal,
  setShowPeopleModal,
  showFollowers,
  followers,
  following,
  addMemberToWL,
  members,
}: props) => {
  const [followersOfLoggedInUser, setFollowersOfLoggedInUser] = useState<
    IUser[] | null
  >(null);

  function checkIsMember(userID: string): boolean | undefined {
    const isMember = members?.some((u) => u._id === userID);
    if (isMember) return isMember;
    else return;
  }

  const getFollowersOfUser = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setFollowersOfLoggedInUser(data.followers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (addMemberToWL && showPeopleModal) {
    getFollowersOfUser();
  }

  return (
    <Modal id="PeopleModal" show={showPeopleModal}>
      <Modal.Header>
        {addMemberToWL ? (
          <div className="d-flex flex-column">
            <h5>Add member to the Watchlist</h5>
            <small>You can only add users who follows you!</small>
          </div>
        ) : showFollowers ? (
          "Followers"
        ) : (
          "Following"
        )}
        <button
          type="button"
          onClick={() => {
            setShowPeopleModal(false);
          }}
        >
          <IoMdClose fontSize="1.8rem" />
        </button>
      </Modal.Header>
      <Modal.Body>
        {showFollowers &&
          followers &&
          followers.length !== 0 &&
          followers.map(
            (u) => u && <UserCardHorizontal key={u._id} user={u} />
          )}
        {!showFollowers &&
          following &&
          following.length !== 0 &&
          following.map(
            (u) => u && <UserCardHorizontal key={u._id} user={u} />
          )}
        {showFollowers
          ? followers?.length === 0 && "Nobody follows this user!"
          : following?.length === 0 && "No following!"}
        {followersOfLoggedInUser &&
          addMemberToWL &&
          members &&
          followersOfLoggedInUser.map(
            (u) =>
              u && (
                <UserCardHorizontal
                  key={u._id}
                  user={u}
                  addMemberToWL={addMemberToWL}
                  checkIsMember={checkIsMember}
                />
              )
          )}
      </Modal.Body>
    </Modal>
  );
};

export default PeopleModal;
