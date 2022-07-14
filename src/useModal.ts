import { useContext } from 'react';
import { ModalDispatchContext, TOmitModalProps } from './ModalContext';

interface IOpenModalFunction<TModalProps> {
  Component: any;
  modalKey?: string;
  props?: TOmitModalProps<TModalProps>;
}

function useModal() {
  const { open, close, closeAll } = useContext(ModalDispatchContext);

  function openModal<TModalProps>({
    Component,
    modalKey = String(Date.now()),
    props,
  }: IOpenModalFunction<TModalProps>) {
    open({
      Component,
      isOpen: true,
      modalKey,
      props,
    });
  }

  const closeModal = (modalKey: string) => {
    close(modalKey);
  };

  return {
    openModal,
    closeModal,
    closeAllModal: closeAll,
  };
}

export default useModal;
