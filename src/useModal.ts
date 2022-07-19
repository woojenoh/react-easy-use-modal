import { ComponentType, useContext } from 'react';
import { ModalDispatchContext } from './ModalContext';
import { ModalComponentProps } from './types';

type OpenModalFunction<ModalProps> = {
  component: ComponentType<any>;
  modalKey?: string;
} & (ModalProps extends undefined ? {
  props?: Record<string, any>;
} : {
  props: ModalComponentProps<ModalProps>;
});

function useModal() {
  const {
    open,
    close,
    closeAll,
    remove,
    removeAll,
  } = useContext(ModalDispatchContext);

  function openModal<ModalProps = undefined>({
    component,
    modalKey = String(Date.now()),
    props = {},
  }: OpenModalFunction<ModalProps>) {
    open({
      component,
      modalKey,
      isOpen: true,
      props,
    });
  }

  const closeModal = (modalKey: string) => {
    close(modalKey);
  };

  const removeModal = (modalKey: string) => {
    remove(modalKey);
  };

  return {
    openModal,
    closeModal,
    closeAllModal: closeAll,
    removeModal,
    removeAllModal: removeAll,
  };
}

export default useModal;
