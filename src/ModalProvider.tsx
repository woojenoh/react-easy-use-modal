import { useState, useMemo, ReactNode } from 'react';
import {
  ModalStateContext,
  ModalDispatchContext,
} from './ModalContext';
import ModalRenderer from './ModalRenderer';
import { errorInvalidKey, warnReservedProperty } from './utils';
import { Modal, Modals } from './types';

interface ModalProviderProps {
  children: ReactNode;
  disableRenderer?: boolean;
}

function ModalProvider({
  children,
  disableRenderer = false,
}: ModalProviderProps) {
  const [modals, setModals] = useState<Modals>({});

  const open = (targetModal: Modal) => {
    warnReservedProperty(targetModal.props);
    setModals((currentModals) => ({
      ...currentModals,
      [targetModal.modalKey]: targetModal,
    }));
  };

  const close = (modalKey: string) => {
    setModals((currentModals) => {
      if (!currentModals[modalKey]) {
        errorInvalidKey();
        return currentModals;
      }
      return {
        ...currentModals,
        [modalKey]: {
          ...currentModals[modalKey],
          isOpen: false,
        },
      };
    });
  };

  const closeAll = () => {
    setModals(
      (currentModals) => Object.keys(currentModals).reduce((acc, key) => ({
        ...acc,
        [key]: {
          ...currentModals[key],
          isOpen: false,
        },
      }), {}),
    );
  };

  const remove = (modalKey: string) => {
    setModals(
      (currentModals) => {
        if (!currentModals[modalKey]) {
          errorInvalidKey();
          return currentModals;
        }
        return Object.keys(currentModals).reduce((acc, key) => {
          if (key === modalKey) {
            return acc;
          }
          return {
            ...acc,
            [key]: currentModals[key],
          };
        }, {});
      },
    );
  };

  const removeAll = () => {
    setModals({});
  };

  const dispatch = useMemo(() => ({
    open,
    close,
    closeAll,
    remove,
    removeAll,
  }), []);

  return (
    <ModalStateContext.Provider value={modals}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
        {!disableRenderer && <ModalRenderer />}
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
}

export default ModalProvider;
