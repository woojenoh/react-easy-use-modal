import { ComponentType } from 'react';

export interface Modal {
  component: ComponentType<any>;
  modalKey: string;
  isOpen: boolean;
  props: Record<string, any>;
}

export interface Modals {
  [key: string]: Modal;
}

export type ReservedModalProps = {
  modalKey: string;
  isOpen: boolean;
  onClose: () => void;
  onRemove: () => void;
};

export type ModalComponentProps<ModalProps> =
  Omit<ModalProps & ReservedModalProps, keyof ReservedModalProps>;
