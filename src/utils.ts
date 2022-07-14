import { IReservedModalProps } from './ModalContext';

export const getVariableName = (object: any) => Object.keys(object)[0];

export const warnReservedProperty = (props: Partial<IReservedModalProps>) => {
  const { isOpen, onClose } = props;
  const warnMessage = (prop: any) => {
    console.warn(`${getVariableName(prop)} is reserved property.`);
  };
  if (isOpen) warnMessage({ isOpen });
  if (onClose) warnMessage({ onClose });
};
