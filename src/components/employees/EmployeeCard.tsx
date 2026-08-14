import { FC } from 'react';
import Link from 'next/link';
import { User } from '@/types';

interface EmployeeCardProps {
  employee: User;
}

const EmployeeCard: FC<EmployeeCardProps> = ({ employee }) => {
  const fullName = `${employee.firstName} ${employee.lastName}`;
  const displayStatus = employee.status || 'Active';
  const statusColor = displayStatus === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';

  return (
    <Link href={`/employees/${employee.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 cursor-pointer">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={employee.image}
            alt={fullName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-800 truncate">{fullName}</h3>
            <p className="text-sm text-gray-500 truncate">{employee.email}</p>
          </div>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">{employee.company.department}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
            {displayStatus}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default EmployeeCard;