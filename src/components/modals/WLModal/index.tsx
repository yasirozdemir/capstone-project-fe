import { Modal } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";
import "./style.css";
import {
  BsBookmarkXFill,
  BsBookmarkCheck,
  BsChevronDown,
  BsFillCheckSquareFill,
} from "react-icons/bs";
import { IWatchlist } from "../../../interfaces/IWatchlist";
import { alertOptions } from "../../../tools";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface props {
  showWLModal: boolean;
  setShowWLModal: Function;
  movieID?: string | undefined;
}

const WLModal = ({ showWLModal, setShowWLModal, movieID }: props) => {
  const [watchlists, setWatchlists] = useState<IWatchlist[] | null>(null);
  const [isCreate, setIsCreate] = useState(false);
  const [name, setName] = useState<string>("");

  const getWLs = async () => {
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };
      const URL = `${process.env.REACT_APP_API_URL}/users/me/watchlists`;
      const res = await fetch(URL, options);
      const data = await res.json();
      if (res.ok) {
        setWatchlists(data);
      } else {
        toast.error(data.message, alertOptions);
      }
    } catch (error) {
      toast.error(String(error), alertOptions);
    }
  };

  useEffect(() => {
    getWLs();
    // eslint-disable-next-line
  }, [showWLModal]);

  const creataNewWL = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (name === "") toast.error("Please insert a name first!", alertOptions);
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ name }),
      };
      const URL = `${process.env.REACT_APP_API_URL}/watchlists`;
      const res = await fetch(URL, options);
      const data = await res.json();
      if (res.ok) {
        toast.success(
          `Watchlist '${data.name}' successfully created!`,
          alertOptions
        );
        getWLs();
      } else {
        toast.error(data.message, alertOptions);
      }
    } catch (error) {
      toast.error(String(error), alertOptions);
    }
  };

  const saveToWL = async (w: IWatchlist, isSave: boolean) => {
    try {
      const options = {
        method: isSave ? "POST" : "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };
      const URL = `${process.env.REACT_APP_API_URL}/watchlists/${w._id}/movies/${movieID}`;
      const res = await fetch(URL, options);
      const data = await res.json();
      if (res.ok) {
        toast.success(
          `Movie successfully ${isSave ? "saved into" : "removed from"} ${
            w.name
          }!`,
          alertOptions
        );
        getWLs();
      } else {
        toast.error(data.message, alertOptions);
      }
    } catch (error) {
      toast.error(String(error), alertOptions);
    }
  };

  function checkIsSaved(WL: IWatchlist): boolean {
    return WL.movies?.some((movie) => movie === movieID);
  }

  return (
    <Modal id="WLModal" show={showWLModal}>
      <Modal.Header>
        <h5 className="m-0">Watchlists</h5>
        <button
          type="button"
          onClick={() => {
            setShowWLModal(false);
          }}
        >
          <IoMdClose style={{ fontSize: "1.8rem" }} />
        </button>
      </Modal.Header>
      <Modal.Body>
        <div>
          {watchlists !== null
            ? watchlists.map((w) => (
                <div key={w._id} className="WL-modal-item">
                  <Link to={"/watchlist/" + w._id} className="WL-link d-flex">
                    <div key={w._id} className="d-flex align-items-center">
                      <div style={{ width: "32px", height: "32px" }}>
                        <img src={w.cover} alt="cover" className="img-fluid" />
                      </div>
                      <span className="ml-2">{w.name}</span>
                    </div>
                  </Link>
                  <div>
                    {checkIsSaved(w) ? (
                      <button
                        className="remove"
                        onClick={() => {
                          saveToWL(w, false);
                        }}
                      >
                        <BsBookmarkXFill />
                      </button>
                    ) : (
                      <button
                        className="save"
                        onClick={() => {
                          saveToWL(w, true);
                        }}
                      >
                        <BsBookmarkCheck />
                      </button>
                    )}
                  </div>
                </div>
              ))
            : "You don't have any watchlist yet!"}
        </div>
      </Modal.Body>
      <Modal.Footer className="d-block">
        <div className="d-flex flex-column justfiy-content-center">
          <button
            onClick={() => {
              setIsCreate(!isCreate);
            }}
          >
            Create a new watchlist! <BsChevronDown />
          </button>
          {isCreate && (
            <form id="create-wl-form" onSubmit={creataNewWL}>
              <input
                type="text"
                name="name"
                placeholder="New Watchlist"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <button type="submit">
                <BsFillCheckSquareFill />
              </button>
            </form>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default WLModal;
