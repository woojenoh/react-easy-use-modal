import { useContext } from 'react';
import { ModalStateContext } from './ModalContext';

function ModalRenderer() {
  const openedModals = useContext(ModalStateContext);

  return (
    <>
      {openedModals.map((modal) => {
        const { Component, props } = modal;
        return <Component key={Component} {...props} />;
      })}
    </>
  );
}

export default ModalRenderer;
