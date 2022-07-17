import { useState, useMemo } from 'react';
import {
  ModalStateContext,
  ModalDispatchContext,
  IModals,
  IModal,
} from './ModalContext';
import ModalRenderer from './ModalRenderer';
import { errorInvalidKey, warnReservedProperty } from './utils';

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
    warnReservedProperty(targetModal.props);
    setOpenedModals((modals) => ({
      ...modals,
      [targetModal.modalKey]: targetModal,
    }));
  };

  const close = (modalKey: string) => {
    setOpenedModals((modals) => {
      if (!modals[modalKey]) {
        errorInvalidKey();
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

  const remove = (modalKey: string) => {
    setOpenedModals(
      (modals) => {
        if (!modals[modalKey]) {
          errorInvalidKey();
          return modals;
        }
        return Object.keys(modals).reduce((acc, key) => {
          if (key === modalKey) {
            return acc;
          }
          return {
            ...acc,
            [key]: modals[key],
          };
        }, {});
      },
    );
  };

  const removeAll = () => {
    setOpenedModals({});
  };

  const dispatch = useMemo(() => ({
    open,
    close,
    closeAll,
    remove,
    removeAll,
  }), []);

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
