import { useContext } from 'react';
import { ModalDispatchContext, ModalStateContext } from './ModalContext';

function ModalRenderer() {
  const openedModals = useContext(ModalStateContext);
  const { close } = useContext(ModalDispatchContext);

  return (
    <>
      {Object.keys(openedModals).map((key) => {
        const {
          Component,
          modalKey,
          isOpen,
          props,
        } = openedModals[key];

        const onClose = () => {
          close(modalKey);
        };

        return (
          <Component
            key={modalKey}
            isOpen={isOpen}
            onClose={onClose}
            {...props}
          />
        );
      })}
    </>
  );
}

export default ModalRenderer;
