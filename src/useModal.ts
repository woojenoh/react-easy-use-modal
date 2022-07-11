import { useContext } from 'react';
import { ModalDispatchContext } from './ModalContext';

type TOpenModalProps<T> = T extends undefined ? void | object : T;

function useModal<T = undefined>(Component: any) {
  const { open, close, closeAll } = useContext(ModalDispatchContext);

  const openModal = (props: TOpenModalProps<T>) => {
    open({
      Component,
      props,
    });
  };

  const closeModal = () => {
    close(Component);
  };

  return {
    openModal,
    closeModal,
    closeAllModal: closeAll,
  };
}

export default useModal;
