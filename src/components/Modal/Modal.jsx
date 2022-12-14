import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { Overlay, ModalWindow } from './Modal.styled';
const modalRoot = document.querySelector('#modal-root');
export const Modal = ({ dataImage, closeModal }) => {
  useEffect(() => {
    const handleEscpClick = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEscpClick);

    return () => {
      window.removeEventListener('keydown', handleEscpClick);
    };
  }, [closeModal]);

  const onClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <Overlay onClick={onClick}>
      <ModalWindow>
        <img src={dataImage} alt="modal-img" />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  dataImage: PropTypes.string.isRequired,
};