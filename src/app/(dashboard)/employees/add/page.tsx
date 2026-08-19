'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addLocalEmployee } from '@/store/slices/employeeSlice';
import EmployeeForm from '@/components/employees/EmployeeForm';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { EmployeeFormData } from '@/types';

import { showToast } from '@/utils/toast';


export default function AddEmployeePage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = (data: EmployeeFormData) => {
    setLoading(true);
    
    // Create a new employee with a unique ID
    const newEmployee = {
      id: Date.now(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      status: data.status,
      company: {
        name: 'Local Company',
        department: data.department,
        title: data.designation,
        address: {
          address: '',
          city: '',
          coordinates: { lat: 0, lng: 0 },
          postalCode: '',
          state: '',
        },
      },
      image: 'https://i.pravatar.cc/150?img=' + Math.floor(Math.random() * 70),
      // Add other required fields with default values
      age: 25,
      gender: 'male',
      phone: '',
      username: '',
      birthDate: '',
      bloodGroup: '',
      height: 0,
      weight: 0,
      eyeColor: '',
      hair: { color: '', type: '' },
      domain: '',
      ip: '',
      address: {
        address: '',
        city: '',
        coordinates: { lat: 0, lng: 0 },
        postalCode: '',
        state: '',
      },
      macAddress: '',
      university: '',
      bank: {
        cardExpire: '',
        cardNumber: '',
        cardType: '',
        currency: '',
        iban: '',
      },
      ein: '',
      ssn: '',
      userAgent: '',
      crypto: {
        coin: '',
        wallet: '',
        network: '',
      },
    };

    dispatch(addLocalEmployee(newEmployee));
    setLoading(false);
        
    showToast.success(`✅ Employee ${data.firstName} ${data.lastName} added successfully!`);

    router.push('/employees');
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button onClick={() => router.back()} variant="secondary" size="sm">
          ← Back
        </Button>
        <h1 className="text-2xl font-semibold text-gray-800">Add Employee</h1>
      </div>

      <Card>
        <EmployeeForm onSubmit={handleSubmit} loading={loading} />
      </Card>
    </div>
  );
}