import "./style.css";
import { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { ChangeEventHandler } from "react";
import { toast } from "react-toastify";
import { alertOptions } from "../../../tools";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { IoMdCheckmarkCircle, IoMdClose } from "react-icons/io";
import { setLoggedInUser } from "../../../redux/actions";

const EditProfile = ({ showEditModal, setShowEditModal }: props) => {
  const [formData, setFormData] = useState<IFormData>({});
  const loggedInUser = useAppSelector((st) => st.store.user);
  const dispatch = useAppDispatch();

  //   const editFunc = async () => {
  //     try {
  //       if (formData.password !== undefined && formData.password !== "") {
  //         delete formData.password;
  //       }

  //       const options = {
  //         method: "PUT",
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //         },
  //         body: JSON.stringify(formData),
  //       };
  //       const URL = `${process.env.REACT_APP_API_URL}/users/me`;
  //       const res = await fetch(URL, options);
  //       if (res.ok) {
  //         dispatch(setLoggedInUser());
  //       } else {
  //         const data = await res.json();
  //         toast.error(data.message, alertOptions);
  //       }
  //     } catch (error) {
  //       toast.error(String(error), alertOptions);
  //     }
  //   };

  const updateFormData: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // editFunc();
  };

  return (
    <Modal id="EditModal" show={showEditModal}>
      <Modal.Header>
        <h5 className="m-0">Edit Profile</h5>
        <button
          onClick={() => {
            setShowEditModal(false);
          }}
        >
          <IoMdClose style={{ fontSize: "1.8rem", fill: "#fff" }} />
        </button>
      </Modal.Header>
      <Form onSubmit={handleSubmit} style={{ height: "fit-content" }}>
        <Modal.Body>
          <input
            type="text"
            name="name"
            placeholder="Name"
            defaultValue={loggedInUser.name}
            autoComplete="false"
            onChange={updateFormData}
          />
          <input
            type="text"
            name="surname"
            placeholder="Surname"
            defaultValue={loggedInUser.surname}
            autoComplete="false"
            onChange={updateFormData}
          />
          <input
            type="email"
            placeholder="Email"
            defaultValue={loggedInUser.email}
            autoComplete="false"
            onChange={updateFormData}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="false"
            onChange={updateFormData}
          />
        </Modal.Body>
        <Modal.Footer>
          <button type="submit">
            Save
            <IoMdCheckmarkCircle
              className="ml-2"
              style={{ fontSize: "1.2rem" }}
            />
          </button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

interface IFormData {
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
}

interface props {
  showEditModal: boolean;
  setShowEditModal: Function;
}

export default EditProfile;
