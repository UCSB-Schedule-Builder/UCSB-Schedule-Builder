import create from 'zustand';
import { ClassListType } from './classLists';

interface ClassSearchState {
  currentClassType: ClassListType | null;
  search: (classType: ClassListType) => void;
  close: () => void;
}

const useSearch = create((set): ClassSearchState => ({
  currentClassType: null,
  search: (classType) => set(() => ({
    currentClassType: classType,
  })),
  close: () => set(() => ({ currentClassType: null }))
}));

export default useSearch;