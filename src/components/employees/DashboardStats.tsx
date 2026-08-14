import { FC, useMemo } from 'react';
import { User } from '@/types';

interface DashboardStatsProps {
  employees: User[];
  localEmployees: User[];
}

const DashboardStats: FC<DashboardStatsProps> = ({ employees, localEmployees }) => {
  const allEmployees = [...employees, ...localEmployees];
  
  const stats = useMemo(() => {
    const total = allEmployees.length;
    const active = allEmployees.filter(e => e.status === 'Active').length;
    const inactive = allEmployees.filter(e => e.status === 'Inactive').length;
    const departments = new Set(allEmployees.map(e => e.company.department)).size;
    
    return { total, active, inactive, departments };
  }, [allEmployees]);

  const statCards = [
    { label: 'Total Employees', value: stats.total, color: 'bg-blue-500' },
    { label: 'Active Employees', value: stats.active, color: 'bg-green-500' },
    { label: 'Inactive Employees', value: stats.inactive, color: 'bg-red-500' },
    { label: 'Total Departments', value: stats.departments, color: 'bg-purple-500' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat) => (
        <div key={stat.label} className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
            <div className={`${stat.color} w-10 h-10 rounded-full opacity-20`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;