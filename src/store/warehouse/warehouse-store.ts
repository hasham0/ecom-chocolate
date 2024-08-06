import { createStore } from "zustand/vanilla";

export type NewWarehouseStateValueTS = {
  isOpen: boolean;
};

export type NewWarehouseStateActionTS = {
  onOpen: () => void;
  onClose: () => void;
};

export const defaultInitState: NewWarehouseStateValueTS = {
  isOpen: false,
};

export type NewWarehouseStoreTS = NewWarehouseStateValueTS &
  NewWarehouseStateActionTS;

export const NewWarehouseStore = (
  initState: NewWarehouseStateValueTS = defaultInitState,
) => {
  return createStore<NewWarehouseStoreTS>()((set) => ({
    ...initState,
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));
};
export default NewWarehouseStore;
