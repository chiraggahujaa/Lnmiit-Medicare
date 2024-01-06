import classes from "./Modal.module.css";
import Card from "../Card/Card";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onHideCart}></div>;
};

const Overlay = (props) => {
  return (
    <div
      className={`${classes.modal} ${props.className}`}
    >
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Card>
      {ReactDOM.createPortal(<Backdrop onHideCart={props.onHideCart}/>, portalElement)}
      {ReactDOM.createPortal(
        <Overlay>{props.children}</Overlay>,
        portalElement
      )}
    </Card>
  );
};

export default Modal;
