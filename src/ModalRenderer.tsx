import { useContext } from 'react';
import { ModalDispatchContext, ModalStateContext } from './ModalContext';

function ModalRenderer() {
  const modals = useContext(ModalStateContext);
  const { close, remove } = useContext(ModalDispatchContext);

  return (
    <>
      {Object.keys(modals).map((key) => {
        const {
          component: Component,
          modalKey,
          isOpen,
          props,
        } = modals[key];

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
