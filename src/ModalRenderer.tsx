import { useContext } from 'react';
import { ModalDispatchContext, ModalStateContext } from './ModalContext';

function ModalRenderer() {
  const openedModals = useContext(ModalStateContext);
  const { close } = useContext(ModalDispatchContext);

  return (
    <>
      {openedModals.map((modal) => {
        const { Component, modalKey, props } = modal;

        const onClose = () => {
          close(modalKey);
        };

        return <Component key={modalKey} onClose={onClose} {...props} />;
      })}
    </>
  );
}

export default ModalRenderer;
