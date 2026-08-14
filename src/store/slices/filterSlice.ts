import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState } from '@/types';

const initialState: FilterState = {
  search: '',
  department: '',
  sortBy: 'firstName',
  sortOrder: 'asc',
  page: 1,
  limit: 10,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.page = 1;
    },
    setDepartment: (state, action: PayloadAction<string>) => {
      state.department = action.payload;
      state.page = 1;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    resetFilters: (state) => {
      state.search = '';
      state.department = '';
      state.sortBy = 'firstName';
      state.sortOrder = 'asc';
      state.page = 1;
    },
  },
});

export const {
  setSearch,
  setDepartment,
  setSortBy,
  setSortOrder,
  setPage,
  resetFilters,
} = filterSlice.actions;
export default filterSlice.reducer;