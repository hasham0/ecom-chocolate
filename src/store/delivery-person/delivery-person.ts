import { createStore } from "zustand/vanilla";

export type NewDeliveryPersonStateValueTS = {
  isOpen: boolean;
};

export type NewDeliveryPersonStateActionTS = {
  onOpen: () => void;
  onClose: () => void;
};

export const defaultInitState: NewDeliveryPersonStateValueTS = {
  isOpen: false,
};

export type NewDeliveryStoreTS = NewDeliveryPersonStateValueTS &
  NewDeliveryPersonStateActionTS;

export const NewDeliveryStore = (
  initState: NewDeliveryPersonStateValueTS = defaultInitState,
) => {
  return createStore<NewDeliveryStoreTS>()((set) => ({
    ...initState,
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));
};
export default NewDeliveryStore;
