import classNames from "classnames";

import Close from "~/Icons/Close";

const Modal = ({ isClosing, onClose, children }) => {
  return (
    <div className={classNames("modal", { "modal--is-closing": isClosing })}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div className="modal__mask" onClick={onClose} />
      <div className="modal__header">
        <button onClick={onClose} className="button modal__header-close-action">
          <Close width={32} height={32} />
        </button>
      </div>
      <div className="modal__content">{children}</div>
      <div className="modal__footer" />
    </div>
  );
};

export default Modal;
