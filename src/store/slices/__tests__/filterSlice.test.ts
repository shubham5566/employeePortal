import filterReducer, {
  setSearch,
  setDepartment,
  setSortBy,
  setSortOrder,
  setPage,
  resetFilters,
} from '../filterSlice';

describe('Filter Slice', () => {
  const initialState = {
    search: '',
    department: '',
    sortBy: 'firstName',
    sortOrder: 'asc',
    page: 1,
    limit: 10,
  };

  it('should handle initial state', () => {
    expect(filterReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setSearch', () => {
    const actual = filterReducer(initialState, setSearch('John'));
    expect(actual.search).toBe('John');
    expect(actual.page).toBe(1); // Should reset to page 1
  });

  it('should handle setDepartment', () => {
    const actual = filterReducer(initialState, setDepartment('Engineering'));
    expect(actual.department).toBe('Engineering');
    expect(actual.page).toBe(1);
  });

  it('should handle setSortBy', () => {
    const actual = filterReducer(initialState, setSortBy('email'));
    expect(actual.sortBy).toBe('email');
  });

  it('should handle setSortOrder', () => {
    const actual = filterReducer(initialState, setSortOrder('desc'));
    expect(actual.sortOrder).toBe('desc');
  });

  it('should handle setPage', () => {
    const actual = filterReducer(initialState, setPage(3));
    expect(actual.page).toBe(3);
  });

  it('should handle resetFilters', () => {
    const modifiedState = {
      search: 'John',
      department: 'Engineering',
      sortBy: 'email',
      sortOrder: 'desc',
      page: 3,
      limit: 10,
    };
    const actual = filterReducer(modifiedState, resetFilters());
    expect(actual).toEqual(initialState);
  });
});