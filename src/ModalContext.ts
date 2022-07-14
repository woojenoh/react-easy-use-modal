import { createContext } from 'react';

export interface IModals {
  [key: string]: IModal;
}

export interface IModal {
  Component: any;
  modalKey: string;
  isOpen: boolean;
  props?: any;
}

export interface IReservedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type TOmittedModalProps<TModalProps> =
  Omit<TModalProps & IReservedModalProps, keyof IReservedModalProps>;

interface IModalDispatchContext {
  open: (targetModal: IModal) => void;
  close: (modalKey: string) => void;
  closeAll: () => void;
}

export const ModalDispatchContext = createContext<IModalDispatchContext>({
  open: () => {},
  close: () => {},
  closeAll: () => {},
});

export const ModalStateContext = createContext<IModals>({});
