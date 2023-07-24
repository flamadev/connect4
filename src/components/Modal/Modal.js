function Modal({ handleClick, children }) {
  return (
    <div className="modal-container" onClick={handleClick}>
      <div className="modal-content">{children}</div>
    </div>
  );
}

export default Modal;
