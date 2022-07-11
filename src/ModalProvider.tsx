import { useState, useMemo } from 'react';
import { ModalStateContext, ModalDispatchContext } from './ModalContext';
import ModalRenderer from './ModalRenderer';
import { IModal } from './types';

interface IModalProvderProps {
  children: any;
  disableRenderer?: boolean;
}

function ModalProvider({ children, disableRenderer = false }: IModalProvderProps) {
  const [openedModals, setOpenedModals] = useState<IModal[]>([]);

  const open = (targetModal: IModal) => {
    setOpenedModals((modals) => [...modals, targetModal]);
  };

  const close = (Component: any) => {
    setOpenedModals(
      (modals) => modals.filter(
        (modal) => modal.Component !== Component,
      ),
    );
  };

  const closeAll = () => {
    setOpenedModals([]);
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
