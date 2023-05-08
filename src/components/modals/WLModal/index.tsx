import { Modal } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";
import "./style.css";
import { BsBookmarks, BsBookmarksFill } from "react-icons/bs";
import { IWatchlist } from "../../../interfaces/IWatchlist";
import { alertOptions } from "../../../tools";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const WLModal = ({ showWLModal, setShowWLModal, movieID }: props) => {
  const [watchlists, setWatchlists] = useState<IWatchlist[] | null>(null);

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
        console.log(data);
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

  const saveToWL = async (w: IWatchlist) => {
    try {
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };
      const URL = `${process.env.REACT_APP_API_URL}/watchlists/${w._id}/movies/${movieID}`;
      const res = await fetch(URL, options);
      const data = await res.json();
      if (res.ok) {
        toast.success(`Movie successfully saved into ${w.name}!`, alertOptions);
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
        <div>HELO</div>
        <div>
          {watchlists !== null
            ? watchlists.map((w) => (
                <div
                  key={w._id}
                  className="WL-modal-item d-flex align-items-center"
                >
                  <div style={{ width: "32px", height: "32px" }}>
                    <img src={w.cover} alt="cover" className="img-fluid" />
                  </div>
                  <span className="ml-1">{w.name}</span>
                  {checkIsSaved(w) ? (
                    <button className="ml-auto" disabled>
                      <BsBookmarksFill />
                    </button>
                  ) : (
                    <button
                      className="ml-auto"
                      onClick={() => {
                        saveToWL(w);
                      }}
                    >
                      <BsBookmarks />
                    </button>
                  )}
                </div>
              ))
            : "You don't have any watchlist yet!"}
        </div>
      </Modal.Body>
    </Modal>
  );
};

interface props {
  showWLModal: boolean;
  setShowWLModal: Function;
  movieID: string | undefined;
}

export default WLModal;
