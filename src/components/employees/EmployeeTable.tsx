import { FC, useState } from 'react';
import Link from 'next/link';
import { User } from '@/types';

interface EmployeeTableProps {
  employees: User[];
  onSort: (field: string) => void;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

const EmployeeTable: FC<EmployeeTableProps> = ({ employees, onSort, sortBy, sortOrder }) => {
  const getStatusColor = (status?: string) => {
    // Default to Active if status is undefined
    const currentStatus = status || 'Active';
    if (currentStatus === 'Active') return 'bg-green-100 text-green-800';
    if (currentStatus === 'Inactive') return 'bg-red-100 text-red-800';
    return 'bg-green-100 text-green-800';
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (sortBy !== field) return <span className="ml-1 text-gray-300">↕</span>;
    return <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>;
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th 
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
              onClick={() => onSort('firstName')}
            >
              Name <SortIcon field="firstName" />
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Department
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Designation
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee) => {
            const displayStatus = employee.status || 'Active';
            return (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{employee.id}</td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {`${employee.firstName} ${employee.lastName}`}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">{employee.email}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{employee.company.department}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{employee.company.title}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(displayStatus)}`}>
                    {displayStatus}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <Link
                    href={`/employees/${employee.id}`}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;