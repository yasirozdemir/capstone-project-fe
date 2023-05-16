import { Modal } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";
import { IUser } from "../../../interfaces/IUser";
import UserCardHorizontal from "../../reusables/UserCardHorizontal";

interface props {
  showPeopleModal: boolean;
  setShowPeopleModal: Function;
  showFollowers: boolean;
  followers: IUser[];
  following: IUser[];
}

const PeopleModal = ({
  showPeopleModal,
  setShowPeopleModal,
  showFollowers,
  followers,
  following,
}: props) => {
  return (
    <Modal id="PeopleModal" show={showPeopleModal}>
      <Modal.Header>
        <h5 className="m-0">{showFollowers ? "Followers" : "Following"}</h5>
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
          followers.length !== 0 &&
          followers.map(
            (u) => u && <UserCardHorizontal key={u._id} user={u} />
          )}
        {!showFollowers &&
          following.length !== 0 &&
          following.map(
            (u) => u && <UserCardHorizontal key={u._id} user={u} />
          )}
        {showFollowers
          ? followers.length === 0 && "Nobody follows this user!"
          : following.length === 0 && "No following!"}
      </Modal.Body>
    </Modal>
  );
};

export default PeopleModal;
