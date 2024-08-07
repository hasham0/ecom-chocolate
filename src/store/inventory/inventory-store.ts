import { createStore } from "zustand/vanilla";

export type NewInventoryStateValueTS = {
  isOpen: boolean;
};

export type NewInventoryStateActionTS = {
  onOpen: () => void;
  onClose: () => void;
};

export const defaultInitState: NewInventoryStateValueTS = {
  isOpen: false,
};

export type NewInventoryStoreTS = NewInventoryStateValueTS &
  NewInventoryStateActionTS;

export const NewInventoryStore = (
  initState: NewInventoryStateValueTS = defaultInitState,
) => {
  return createStore<NewInventoryStoreTS>()((set) => ({
    ...initState,
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));
};
export default NewInventoryStore;
