import { api } from './api';
import { User, ApiResponse } from '@/types';
import { showToast } from '@/utils/toast';

export const fetchUsers = async (limit: number, skip: number): Promise<ApiResponse<User>> => {
   try {
    const data = await api.get<ApiResponse<User>>(`/users?limit=${limit}&skip=${skip}`);
    
    // Add status to each user
    const usersWithStatus = data.users.map((user, index) => ({
      ...user,
      status: index % 3 === 0 ? 'Inactive' : 'Active'
    }));
    
    return {
      ...data,
      users: usersWithStatus
    };
  } catch (error) {
    showToast.error('❌ Failed to fetch employees. Please try again.');
    throw error;
  }

};

export const fetchUserById = async (id: number): Promise<User> => {
   try {
    const data = await api.get<User>(`/users/${id}`);
    return {
      ...data,
      status: data.status || (id % 3 === 0 ? 'Inactive' : 'Active')
    };
  } catch (error) {
    showToast.error(`❌ Failed to fetch employee with ID: ${id}`);
    throw error;
  }

};