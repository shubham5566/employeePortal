import { api } from './api';
import { User, ApiResponse } from '@/types';

export const fetchUsers = async (limit: number, skip: number): Promise<ApiResponse<User>> => {
  const data = await api.get<ApiResponse<User>>(`/users?limit=${limit}&skip=${skip}`);
  
  // Add status to each user since API doesn't provide it
  const usersWithStatus = data.users.map((user, index) => ({
    ...user,
    // For demo: alternate between Active and Inactive
    // You can change this logic based on your requirements
    status: index % 3 === 0 ? 'Inactive' : 'Active'
  }));
  
  return {
    ...data,
    users: usersWithStatus
  };
};

export const fetchUserById = async (id: number): Promise<User> => {
  const data = await api.get<User>(`/users/${id}`);
  // Add status if not present
  return {
    ...data,
    status: data.status || (id % 3 === 0 ? 'Inactive' : 'Active')
  };
};