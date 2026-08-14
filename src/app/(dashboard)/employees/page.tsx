'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { RootState } from '@/store/store';
import { fetchEmployees, addLocalEmployee } from '@/store/slices/employeeSlice';
import { setPage, setSortBy, setSortOrder } from '@/store/slices/filterSlice';
import { useDebounce } from '@/hooks/useDebounce';
import EmployeeTable from '@/components/employees/EmployeeTable';
import EmployeeCard from '@/components/employees/EmployeeCard';
import EmployeeFilters from '@/components/employees/EmployeeFilters';
import DashboardStats from '@/components/employees/DashboardStats';
import Pagination from '@/components/common/Pagination';
import Button from '@/components/common/Button';
import { ITEMS_PER_PAGE } from '@/constants';

export default function EmployeesPage() {
  const dispatch = useDispatch();
  const { employees, loading, error, total, localEmployees } = useSelector(
    (state: RootState) => state.employees
  );
  const filters = useSelector((state: RootState) => state.filters);
  const debouncedSearch = useDebounce(filters.search, 500);

  // Combine API employees with local employees
  const allEmployees = useMemo(() => {
    return [...localEmployees, ...employees];
  }, [localEmployees, employees]);

  // Filter employees based on search and department
  const filteredEmployees = useMemo(() => {
    let filtered = allEmployees;

    if (debouncedSearch) {
      const searchLower = debouncedSearch.toLowerCase();
      filtered = filtered.filter(
        (emp) =>
          `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchLower) ||
          emp.email.toLowerCase().includes(searchLower)
      );
    }

    if (filters.department) {
      filtered = filtered.filter(
        (emp) => emp.company.department === filters.department
      );
    }

    // Sort employees
    const sorted = [...filtered].sort((a, b) => {
      let aVal = a[filters.sortBy as keyof typeof a];
      let bVal = b[filters.sortBy as keyof typeof b];
      
      if (filters.sortBy === 'company.department') {
        aVal = a.company.department;
        bVal = b.company.department;
      }

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return filters.sortOrder === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return 0;
    });

    return sorted;
  }, [allEmployees, debouncedSearch, filters.department, filters.sortBy, filters.sortOrder]);

  // Pagination
  const paginatedEmployees = useMemo(() => {
    const start = (filters.page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredEmployees.slice(start, end);
  }, [filteredEmployees, filters.page]);

  useEffect(() => {
    dispatch(fetchEmployees({ limit: ITEMS_PER_PAGE, skip: 0 }) as any);
  }, [dispatch]);

  const handleSort = useCallback((field: string) => {
    if (filters.sortBy === field) {
      dispatch(setSortOrder(filters.sortOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      dispatch(setSortBy(field));
      dispatch(setSortOrder('asc'));
    }
  }, [dispatch, filters.sortBy, filters.sortOrder]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Employees</h1>
        <Link href="/employees/add">
          <Button>Add Employee</Button>
        </Link>
      </div>

      <DashboardStats employees={employees} localEmployees={localEmployees} />
      <EmployeeFilters />

      {filteredEmployees.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No employees found</p>
        </div>
      ) : (
        <>
          {isMobile ? (
            <div className="grid grid-cols-1 gap-4">
              {paginatedEmployees.map((employee) => (
                <EmployeeCard key={employee.id} employee={employee} />
              ))}
            </div>
          ) : (
            <EmployeeTable
              employees={paginatedEmployees}
              onSort={handleSort}
              sortBy={filters.sortBy}
              sortOrder={filters.sortOrder}
            />
          )}
          <Pagination
            currentPage={filters.page}
            totalItems={filteredEmployees.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={(page) => dispatch(setPage(page))}
          />
        </>
      )}
    </div>
  );
}