import { useContext } from 'react';
import { ModalDispatchContext, TOmittedModalProps } from './ModalContext';

type TOpenModalFunction<TModalProps> = {
  Component: any;
  modalKey?: string;
} & (TModalProps extends undefined ? {
  props?: Record<string, any>;
} : {
  props: TOmittedModalProps<TModalProps>;
});

function useModal() {
  const {
    open,
    close,
    closeAll,
    remove,
    removeAll,
  } = useContext(ModalDispatchContext);

  function openModal<TModalProps = undefined>({
    Component,
    modalKey = String(Date.now()),
    props = {},
  }: TOpenModalFunction<TModalProps>) {
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
