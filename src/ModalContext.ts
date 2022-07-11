import { createContext } from 'react';
import { IModal } from './types';

interface IModalDispatchContext {
  open: (targetModal: IModal) => void;
  close: (Component: any) => void;
  closeAll: () => void;
}

export const ModalDispatchContext = createContext<IModalDispatchContext>({
  open: () => {},
  close: () => {},
  closeAll: () => {},
});

export const ModalStateContext = createContext<IModal[]>([]);
