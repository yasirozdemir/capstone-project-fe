import { useRef, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { ChangeEventHandler } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import "./style.css";
import {
  IoMdPhotos,
  IoMdCheckmarkCircle,
  IoMdTrash,
  IoMdClose,
} from "react-icons/io";
import { MutatingDots } from "react-loader-spinner";
import { setLoggedInUser } from "../../../redux/actions";
import { IUser } from "../../../interfaces/IUser";

interface props {
  showAvatarModal: boolean;
  setShowAvatarModal: Function;
  setUser: Function;
}

const AvatarModal = ({
  showAvatarModal,
  setShowAvatarModal,
  setUser,
}: props) => {
  const dispatch = useAppDispatch();
  const imgSrc = useAppSelector((st) => st.store.user.avatar);
  const [imgData, setImgData] = useState<FormData>();
  const [isChanging, setIsChanging] = useState(false);

  const setAvatar = async (isSet: boolean) => {
    try {
      setIsChanging(true);
      let options: { headers: HeadersInit; method?: string; body?: FormData } =
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        };
      if (isSet) {
        options.method = "POST";
        options.body = imgData;
      } else options.method = "DELETE";
      const URL = `${process.env.REACT_APP_API_URL}/users/me/avatar`;
      const res = await fetch(URL, options);
      const data = await res.json();
      if (res.ok) {
        toast.success("Avatar has successfully updated!");
        setUser((prevUser: IUser) => ({
          ...prevUser,
          avatar: isSet
            ? data.avatarURL
            : "https://res.cloudinary.com/yasirdev/image/upload/v1684314041/WhataMovie/users/avatars/user_default.jpg",
        }));
        dispatch(setLoggedInUser());
      } else {
        if (isSet) {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(String(error));
    } finally {
      setIsChanging(false);
    }
  };

  const inputRef = useRef(null);
  const imitateInputFile = () => {
    (inputRef.current! as HTMLInputElement).click();
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      const img = e.target.files[0];
      const imgData = new FormData();
      imgData.append("avatar", img);
      setImgData(imgData);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAvatar(true);
  };

  return (
    <Modal id="PPModal" show={showAvatarModal}>
      <Modal.Header>
        <h5 className="m-0">Profile photo</h5>
        <button
          onClick={() => {
            setShowAvatarModal(false);
          }}
        >
          <IoMdClose style={{ fontSize: "1.8rem" }} />
        </button>
      </Modal.Header>
      <Modal.Body>
        {isChanging ? (
          <div
            className="d-flex align-items-center"
            style={{ height: "280px" }}
          >
            <MutatingDots
              height="100"
              width="100"
              color="#fff"
              secondaryColor="#fff"
              radius="12.5"
              visible={true}
            />
          </div>
        ) : (
          <img
            src={imgSrc}
            className="w-100 rounded-circle"
            style={{ objectFit: "cover" }}
            alt="Profile img"
            onClick={() => {
              setShowAvatarModal(true);
            }}
          />
        )}
      </Modal.Body>
      <Form onSubmit={handleSubmit} style={{ height: "fit-content" }}>
        <Modal.Footer>
          <button
            onClick={imitateInputFile}
            type="button"
            className="d-flex flex-column align-items-center"
          >
            <IoMdPhotos style={{ fontSize: "1.5rem" }} />
            Add photo
          </button>
          <input
            type="file"
            className="d-none"
            id="avatar"
            name="avatar"
            ref={inputRef}
            accept="image/png, image/jpeg"
            onChange={handleChange}
          ></input>
          <button
            className="d-flex flex-column align-items-center"
            type="submit"
          >
            <IoMdCheckmarkCircle style={{ fontSize: "1.5rem" }} />
            Submit
          </button>
          <button
            type="button"
            className="d-flex flex-column align-items-center ml-auto"
            onClick={() => {
              setAvatar(false);
            }}
          >
            <IoMdTrash style={{ fontSize: "1.5rem" }} />
            Delete
          </button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AvatarModal;
