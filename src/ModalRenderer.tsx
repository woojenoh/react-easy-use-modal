import { useContext } from 'react';
import { ModalDispatchContext, ModalStateContext } from './ModalContext';

function ModalRenderer() {
  const openedModals = useContext(ModalStateContext);
  const { close, remove } = useContext(ModalDispatchContext);

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

        const onRemove = () => {
          remove(modalKey);
        };

        return (
          <Component
            key={modalKey}
            modalKey={modalKey}
            isOpen={isOpen}
            onClose={onClose}
            onRemove={onRemove}
            {...props}
          />
        );
      })}
    </>
  );
}

export default ModalRenderer;
