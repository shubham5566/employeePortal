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
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 cursor-pointer active:scale-[0.98] transition-transform">
        <div className="flex items-start gap-3">
          <img
            src={employee.image}
            alt={fullName}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-800 truncate">{fullName}</h3>
            <p className="text-xs text-gray-500 truncate">{employee.email}</p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs text-gray-600 truncate max-w-[120px]">
            {employee.company.department}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
            {displayStatus}
          </span>
        </div>
        <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
          <span className="text-xs text-gray-400 truncate max-w-[100px]">
            {employee.company.title}
          </span>
          <span className="text-xs text-blue-600 font-medium">View →</span>
        </div>
      </div>
    </Link>
  );
};

export default EmployeeCard;