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
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on client side
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  return (
    <div className="px-2 sm:px-4 md:px-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Employees</h1>
        <Link href="/employees/add" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto">
            <span className="flex items-center justify-center gap-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Employee
            </span>
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <DashboardStats employees={employees} localEmployees={localEmployees} />

      {/* Filters */}
      <EmployeeFilters />

      {/* Employee List */}
      {filteredEmployees.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-500">No employees found</p>
          <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
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
            <div className="overflow-x-auto">
              <EmployeeTable
                employees={paginatedEmployees}
                onSort={handleSort}
                sortBy={filters.sortBy}
                sortOrder={filters.sortOrder}
              />
            </div>
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