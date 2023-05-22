import { IUser } from "../../../interfaces/IUser";
import { Link } from "react-router-dom";
import "./style.css";
import { MdPersonAddAlt1 } from "react-icons/md";
import { checkIsMe } from "../../../tools";

const UserCardHorizontal = ({
  user,
  addMemberToWL,
  checkIsMember,
}: {
  user: IUser;
  addMemberToWL?: Function;
  checkIsMember?: Function;
}) => {
  return (
    <div id="user-card-horizontal" className="d-flex align-items-center mb-2">
      <Link
        to={`/user/${checkIsMe(user._id) ? "me" : user._id}`}
        className="d-flex align-items-center"
      >
        <div className="rounded-circle d-flex align-items-center justify-content-center">
          <img src={user.avatar} alt="avatar" className="img-fluid" />
        </div>
        <p className="m-0 ml-2">
          {user.name} {user.surname}
        </p>
      </Link>
      {addMemberToWL && checkIsMember && (
        <>
          {checkIsMember(user._id) ? (
            <small style={{ color: "green", pointerEvents: "none" }}>
              Member!
            </small>
          ) : (
            <button
              onClick={() => {
                addMemberToWL(user._id);
              }}
            >
              <MdPersonAddAlt1 fontSize="1.5rem" />
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default UserCardHorizontal;
