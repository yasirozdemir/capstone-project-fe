import { IUser } from "../../../interfaces/IUser";
import { Link } from "react-router-dom";
import "./style.css";

const UserCardHorizontal = ({ user }: { user: IUser }) => {
  return (
    <Link
      to={"/user/" + user._id}
      id="user-card-horizontal"
      className="d-flex align-items-center"
    >
      <div className="rounded-circle d-flex align-items-center justify-content-center">
        <img src={user.avatar} alt="avatar" className="img-fluid" />
      </div>
      <p className="m-0 ml-2">
        {user.name} {user.surname}
      </p>
    </Link>
  );
};

export default UserCardHorizontal;
