import { IReservedModalProps } from './ModalContext';

const getVariableName = (object: any) => Object.keys(object)[0];

export const warnReservedProperty = (props: Partial<IReservedModalProps>) => {
  const {
    modalKey,
    isOpen,
    onClose,
    onRemove,
  } = props;

  const warnMessage = (prop: any) => {
    console.warn(`${getVariableName(prop)} is reserved property.`);
  };

  if (modalKey) warnMessage({ modalKey });
  if (isOpen) warnMessage({ isOpen });
  if (onClose) warnMessage({ onClose });
  if (onRemove) warnMessage({ onRemove });
};

export const errorInvalidKey = () => {
  console.error('Invalid modal key.');
};
