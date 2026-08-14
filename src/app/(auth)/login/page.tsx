'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { login } from '@/store/slices/authSlice';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';

interface LoginFormData {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required'),
}).required();

export default function LoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError('');

    if (data.email === 'admin@test.com' && data.password === 'Admin@123') {
      dispatch(login({ email: data.email }));
      router.push('/employees'); // Changed from '/dashboard' to '/employees'
    } else {
      setError('Invalid email or password');
    }
    setLoading(false);
  };

  return (
    <Card title="Login" className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-md text-sm">
            {error}
          </div>
        )}
        <Input
          label="Email"
          type="email"
          placeholder="admin@test.com"
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Admin@123"
          {...register('password')}
          error={errors.password?.message}
        />
        <Button type="submit" fullWidth loading={loading}>
          Login
        </Button>
        <p className="text-sm text-gray-500 text-center mt-2">
          Use: admin@test.com / Admin@123
        </p>
      </form>
    </Card>
  );
}