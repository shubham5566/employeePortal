import employeeReducer, { 
  addLocalEmployee, 
  setEmployeeStatus,
  toggleEmployeeStatus,
  fetchEmployees 
} from '../employeeSlice';
import { User } from '@/types';

describe('Employee Slice', () => {
  const initialState = {
    employees: [],
    loading: false,
    error: null,
    total: 0,
    localEmployees: [],
  };

  const mockEmployee: User = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    status: 'Active',
    company: {
      department: 'Engineering',
      name: 'Tech Corp',
      title: 'Developer',
      address: {
        address: '123 Main St',
        city: 'New York',
        coordinates: { lat: 0, lng: 0 },
        postalCode: '10001',
        state: 'NY',
      },
    },
    image: 'https://i.pravatar.cc/150?img=1',
    age: 30,
    gender: 'male',
    phone: '123-456-7890',
    username: 'johndoe',
    birthDate: '1994-01-01',
    bloodGroup: 'A+',
    height: 180,
    weight: 75,
    eyeColor: 'blue',
    hair: { color: 'brown', type: 'straight' },
    domain: 'example.com',
    ip: '192.168.1.1',
    address: {
      address: '123 Main St',
      city: 'New York',
      coordinates: { lat: 0, lng: 0 },
      postalCode: '10001',
      state: 'NY',
    },
    macAddress: '00:11:22:33:44:55',
    university: 'MIT',
    bank: {
      cardExpire: '12/25',
      cardNumber: '1234 5678 9012 3456',
      cardType: 'Visa',
      currency: 'USD',
      iban: 'US1234567890',
    },
    ein: '12-3456789',
    ssn: '123-45-6789',
    userAgent: 'Mozilla/5.0',
    crypto: {
      coin: 'Bitcoin',
      wallet: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      network: 'Mainnet',
    },
  };

  it('should handle initial state', () => {
    expect(employeeReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addLocalEmployee', () => {
    const actual = employeeReducer(initialState, addLocalEmployee(mockEmployee));
    expect(actual.localEmployees).toHaveLength(1);
    expect(actual.localEmployees[0]).toEqual(mockEmployee);
    expect(actual.total).toBe(1);
  });

  it('should handle setEmployeeStatus', () => {
    const stateWithEmployee = {
      ...initialState,
      employees: [{ ...mockEmployee, status: 'Active' }],
    };
    
    const actual = employeeReducer(
      stateWithEmployee,
      setEmployeeStatus({ id: 1, status: 'Inactive' })
    );
    
    expect(actual.employees[0].status).toBe('Inactive');
  });

  it('should handle toggleEmployeeStatus', () => {
    const stateWithEmployee = {
      ...initialState,
      employees: [{ ...mockEmployee, status: 'Active' }],
    };
    
    const actual = employeeReducer(
      stateWithEmployee,
      toggleEmployeeStatus(1)
    );
    
    expect(actual.employees[0].status).toBe('Inactive');
  });

  it('should handle loading state for fetchEmployees', () => {
    const action = { type: fetchEmployees.pending.type };
    const actual = employeeReducer(initialState, action);
    expect(actual.loading).toBe(true);
  });

  it('should handle fulfilled state for fetchEmployees', () => {
    const action = {
      type: fetchEmployees.fulfilled.type,
      payload: {
        users: [mockEmployee],
        total: 1,
        skip: 0,
        limit: 10,
      },
    };
    const actual = employeeReducer(initialState, action);
    expect(actual.loading).toBe(false);
    expect(actual.employees).toHaveLength(1);
    expect(actual.total).toBe(1);
    expect(actual.error).toBeNull();
  });
});