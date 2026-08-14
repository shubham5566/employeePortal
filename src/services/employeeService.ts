import { api } from './api';
import { User, ApiResponse } from '@/types';

export const fetchUsers = async (limit: number, skip: number): Promise<ApiResponse<User>> => {
  const data = await api.get<ApiResponse<User>>(`/users?limit=${limit}&skip=${skip}`);
  return data;
};

export const fetchUserById = async (id: number): Promise<User> => {
  const data = await api.get<User>(`/users/${id}`);
  return data;
};