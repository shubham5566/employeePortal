import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, ApiResponse } from '@/types';
import { fetchUsers } from '@/services/employeeService';

interface EmployeeState {
  employees: User[];
  loading: boolean;
  error: string | null;
  total: number;
  localEmployees: User[];
}

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
  total: 0,
  localEmployees: [],
};

export const fetchEmployees = createAsyncThunk(
  'employees/fetch',
  async (params: { limit: number; skip: number }) => {
    const response = await fetchUsers(params.limit, params.skip);
    return response;
  }
);

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addLocalEmployee: (state, action: PayloadAction<User>) => {
      state.localEmployees.push(action.payload);
      state.total += 1;
    },
    setEmployeeStatus: (state, action: PayloadAction<{ id: number; status: 'Active' | 'Inactive' }>) => {
      const employee = state.employees.find(e => e.id === action.payload.id);
      if (employee) {
        employee.status = action.payload.status;
      }
    },
    toggleEmployeeStatus: (state, action: PayloadAction<number>) => {
      const employee = state.employees.find(e => e.id === action.payload);
      if (employee) {
        employee.status = employee.status === 'Active' ? 'Inactive' : 'Active';
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<ApiResponse<User>>) => {
        state.loading = false;
        state.employees = action.payload.users;
        state.total = action.payload.total;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch employees';
      });
  },
});

export const { addLocalEmployee, setEmployeeStatus, toggleEmployeeStatus } = employeeSlice.actions;
export default employeeSlice.reducer;