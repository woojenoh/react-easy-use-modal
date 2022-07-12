import { useState, useMemo } from 'react';
import { ModalStateContext, ModalDispatchContext, IModal } from './ModalContext';
import ModalRenderer from './ModalRenderer';

interface IModalProviderProps {
  children: any;
  disableRenderer?: boolean;
}

function ModalProvider({
  children,
  disableRenderer = false,
}: IModalProviderProps) {
  const [openedModals, setOpenedModals] = useState<IModal[]>([]);

  const open = (targetModal: IModal) => {
    setOpenedModals((modals) => [...modals, targetModal]);
  };

  const close = (modalKey: string) => {
    setOpenedModals(
      (modals) => modals.filter((modal) => modal.modalKey !== modalKey),
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
