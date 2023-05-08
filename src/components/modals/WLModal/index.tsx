import { Modal } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";

const WLModal = ({ showWLModal, setShowWLModal }: props) => {
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
      <Modal.Body></Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

interface props {
  showWLModal: boolean;
  setShowWLModal: Function;
}

export default WLModal;
