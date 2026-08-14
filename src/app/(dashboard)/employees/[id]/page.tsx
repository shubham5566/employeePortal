'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { User } from '@/types';
import { fetchUserById } from '@/services/employeeService';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function EmployeeDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [employee, setEmployee] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadEmployee = async () => {
      try {
        setLoading(true);
        const data = await fetchUserById(Number(id));
        setEmployee(data);
      } catch (err) {
        setError('Failed to load employee details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadEmployee();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !employee) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg">
        {error || 'Employee not found'}
      </div>
    );
  }

  const fullName = `${employee.firstName} ${employee.lastName}`;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button onClick={() => router.back()} variant="secondary" size="sm">
          <ArrowLeftIcon className="w-4 h-4 inline mr-1" />
          Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <div className="flex flex-col items-center">
              <img
                src={employee.image}
                alt={fullName}
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
              />
              <h2 className="mt-4 text-xl font-semibold">{fullName}</h2>
              <p className="text-gray-500">{employee.company.title}</p>
              <p className="text-sm text-gray-400">{employee.company.department}</p>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card title="Employee Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-gray-800">{employee.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Phone</label>
                <p className="text-gray-800">{employee.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <p className="text-gray-800">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    employee.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {employee.status || 'Active'}
                  </span>
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Company</label>
                <p className="text-gray-800">{employee.company.name}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-500">Address</label>
                <p className="text-gray-800">
                  {employee.address.address}, {employee.address.city}, {employee.address.state}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}