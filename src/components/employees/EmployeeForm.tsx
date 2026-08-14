import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { EmployeeFormData } from '@/types';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { DEPARTMENTS, DESIGNATIONS, STATUSES } from '@/constants';

interface EmployeeFormProps {
  onSubmit: (data: EmployeeFormData) => void;
  loading?: boolean;
}

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  department: yup.string().required('Department is required'),
  designation: yup.string().required('Designation is required'),
  status: yup.string().required('Status is required'),
}).required();

const EmployeeForm: FC<EmployeeFormProps> = ({ onSubmit, loading = false }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<EmployeeFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          {...register('firstName')}
          error={errors.firstName?.message}
        />
        <Input
          label="Last Name"
          {...register('lastName')}
          error={errors.lastName?.message}
        />
        <Input
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
        <Select
          label="Department"
          options={DEPARTMENTS.map(dept => ({ value: dept, label: dept }))}
          {...register('department')}
          error={errors.department?.message}
        />
        <Select
          label="Designation"
          options={DESIGNATIONS.map(design => ({ value: design, label: design }))}
          {...register('designation')}
          error={errors.designation?.message}
        />
        <Select
          label="Status"
          options={STATUSES.map(status => ({ value: status, label: status }))}
          {...register('status')}
          error={errors.status?.message}
        />
      </div>
      <Button type="submit" loading={loading}>
        Add Employee
      </Button>
    </form>
  );
};

export default EmployeeForm;