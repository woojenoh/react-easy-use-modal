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

interface IDefaultModalProps {
  onClose: () => void;
}

export type TOmitModalProps<TModalProps> =
  Omit<TModalProps & IDefaultModalProps, keyof IDefaultModalProps>;

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