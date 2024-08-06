import { createStore } from "zustand/vanilla";

export type NewProductStateValueTS = {
  isOpen: boolean;
};

export type NewProductStateActionTS = {
  onOpen: () => void;
  onClose: () => void;
};

export const defaultInitState: NewProductStateValueTS = {
  isOpen: false,
};

export type NewProductStoreTS = NewProductStateValueTS &
  NewProductStateActionTS;

export const NewProductStore = (
  initState: NewProductStateValueTS = defaultInitState,
) => {
  return createStore<NewProductStoreTS>()((set) => ({
    ...initState,
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));
};
export default NewProductStore;
