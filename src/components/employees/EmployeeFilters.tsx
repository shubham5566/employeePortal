import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setSearch, setDepartment, setSortBy, setSortOrder, resetFilters } from '@/store/slices/filterSlice';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { DEPARTMENTS } from '@/constants';

const EmployeeFilters: FC = () => {
  const dispatch = useDispatch();
  const { search, department } = useSelector((state: RootState) => state.filters);

  const departmentOptions = [
    { value: '', label: 'All Departments' },
    ...DEPARTMENTS.map(dept => ({ value: dept, label: dept })),
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
        <Select
          options={departmentOptions}
          value={department}
          onChange={(e) => dispatch(setDepartment(e.target.value))}
        />
        <div className="flex gap-2 items-end">
          <Select
            options={[
              { value: 'firstName', label: 'Name' },
              { value: 'email', label: 'Email' },
              { value: 'company.department', label: 'Department' },
            ]}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
          />
          <Select
            options={[
              { value: 'asc', label: 'Ascending' },
              { value: 'desc', label: 'Descending' },
            ]}
            onChange={(e) => dispatch(setSortOrder(e.target.value as 'asc' | 'desc'))}
          />
          <Button variant="secondary" onClick={() => dispatch(resetFilters())}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeFilters;