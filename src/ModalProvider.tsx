import { useState, useMemo } from 'react';
import {
  ModalStateContext,
  ModalDispatchContext,
  IModals,
  IModal,
} from './ModalContext';
import ModalRenderer from './ModalRenderer';

interface IModalProviderProps {
  children: any;
  disableRenderer?: boolean;
}

function ModalProvider({
  children,
  disableRenderer = false,
}: IModalProviderProps) {
  const [openedModals, setOpenedModals] = useState<IModals>({});

  const open = (targetModal: IModal) => {
    setOpenedModals((modals) => ({
      ...modals,
      [targetModal.modalKey]: {
        ...targetModal,
        isOpen: true,
      },
    }));
  };

  const close = (modalKey: string) => {
    setOpenedModals((modals) => {
      if (!modals[modalKey]) {
        console.error('Modal does not exist.');
        return modals;
      }
      return {
        ...modals,
        [modalKey]: {
          ...modals[modalKey],
          isOpen: false,
        },
      };
    });
  };

  const closeAll = () => {
    setOpenedModals(
      (modals) => Object.keys(modals).reduce((acc, key) => ({
        ...acc,
        [key]: {
          ...modals[key],
          isOpen: false,
        },
      }), {}),
    );
  };

  const dispatch = useMemo(() => ({ open, close, closeAll }), []);

  return (
    <ModalStateContext.Provider value={openedModals}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
        {!disableRenderer && <ModalRenderer />}
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
}

export default ModalProvider;
