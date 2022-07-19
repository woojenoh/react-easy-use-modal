import { createContext } from 'react';
import { Modal, Modals } from './types';

interface ModalDispatch {
  open: (targetModal: Modal) => void;
  close: (modalKey: string) => void;
  closeAll: () => void;
  remove: (modalKey: string) => void;
  removeAll: () => void;
}

export const ModalDispatchContext = createContext<ModalDispatch>({
  open: () => {},
  close: () => {},
  closeAll: () => {},
  remove: () => {},
  removeAll: () => {},
});

export const ModalStateContext = createContext<Modals>({});
