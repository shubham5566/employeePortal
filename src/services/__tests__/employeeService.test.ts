import { fetchUsers, fetchUserById } from '../employeeService';
import { api } from '../api';

jest.mock('../api', () => ({
  api: {
    get: jest.fn(),
  },
}));

describe('Employee Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch users with pagination', async () => {
    const mockResponse = {
      users: [
        { id: 1, firstName: 'John', lastName: 'Doe', status: 'Active' },
        { id: 2, firstName: 'Jane', lastName: 'Smith', status: 'Active' },
      ],
      total: 2,
      skip: 0,
      limit: 10,
    };

    (api.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await fetchUsers(10, 0);
    expect(api.get).toHaveBeenCalledWith('/users?limit=10&skip=0');
    expect(result).toEqual(mockResponse);
  });

  it('should fetch user by id', async () => {
    const mockUser = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      status: 'Active',
    };

    (api.get as jest.Mock).mockResolvedValue(mockUser);

    const result = await fetchUserById(1);
    expect(api.get).toHaveBeenCalledWith('/users/1');
    expect(result).toEqual(mockUser);
  });

  it('should handle API errors', async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error('API Error'));

    await expect(fetchUsers(10, 0)).rejects.toThrow('API Error');
  });

  it('should add status to users if not present', async () => {
    const mockResponse = {
      users: [
        { id: 1, firstName: 'John', lastName: 'Doe' },
        { id: 2, firstName: 'Jane', lastName: 'Smith' },
      ],
      total: 2,
      skip: 0,
      limit: 10,
    };

    (api.get as jest.Mock).mockResolvedValue(mockResponse);

    const result = await fetchUsers(10, 0);
    expect(result.users[0]).toHaveProperty('status');
  });
});