import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { Overlay, ModalWindow } from './Modal.styled';
const modalRoot = document.querySelector('#modal-root');
export const Modal = ({ dataImage: { src, alt }, closeModal }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleEscpClick = e => {
    console.log(e);
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    console.log('mount');
    return console.log('unmount');
  }, []);

  // componentDidMount() {
  //   window.addEventListener('keydown', this.handleEscpClick);
  // }
  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleEscpClick);
  // }

  const onClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <Overlay onClick={onClick}>
      <ModalWindow>
        <img src={src} alt={alt} />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  dataImage: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
};
