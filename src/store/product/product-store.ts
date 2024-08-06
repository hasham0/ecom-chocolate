import { createStore } from "zustand/vanilla";

export type NewProductStateValueTS = {
  isOpen: boolean;
};

export type NewProductStateActionTS = {
  onOpen: () => void;
  onClose: () => void;
};

// const useNewProduct = create<NewProductStateTS>((set) => {
//   return {
//     isOpen: false,
//     onOpen: () => set({ isOpen: true }),
//     onClose: () => set({ isOpen: false }),
//   };
// });

export const defaultInitState: NewProductStateValueTS = {
  isOpen: false,
};

export type NewProductSoreTS = NewProductStateValueTS & NewProductStateActionTS;

export const NewProductStore = (
  initState: NewProductStateValueTS = defaultInitState,
) => {
  return createStore<NewProductSoreTS>()((set) => ({
    ...initState,
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));
};
export default NewProductStore;
