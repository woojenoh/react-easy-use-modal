import { useContext } from 'react';
import { ModalDispatchContext, TOmittedModalProps } from './ModalContext';

interface IOpenModalFunction<TModalProps> {
  Component: any;
  modalKey?: string;
  props?: TOmittedModalProps<TModalProps> | {};
}

function useModal() {
  const {
    open,
    close,
    closeAll,
    remove,
    removeAll,
  } = useContext(ModalDispatchContext);

  function openModal<TModalProps>({
    Component,
    modalKey = String(Date.now()),
    props = {},
  }: IOpenModalFunction<TModalProps>) {
    open({
      Component,
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
