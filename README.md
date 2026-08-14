# Employee Management System

A production-ready employee management application built with Next.js, React, TypeScript, and Redux Toolkit.

## Features

### Authentication
- Login page with hardcoded credentials
- Session persistence with localStorage
- Protected routes
- Logout functionality

### Employee Management
- Table view (desktop) and card view (mobile) of employees
- Search by name or email with debouncing
- Filter by department
- Sort by name
- Pagination
- Dashboard summary cards

### Employee Details
- View complete employee information
- State preservation on navigation back

### Add Employee
- Form validation with Yup
- Local state management
- New employees appear in the list

### Technical Highlights
- TypeScript for type safety
- Redux Toolkit for state management
- Responsive design with Tailwind CSS
- Reusable components
- API service layer with error handling
- Loading states and error boundaries

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **Forms:** React Hook Form + Yup
- **HTTP Client:** Native Fetch API

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/shubham5566/employeePortal.git
cd employeePortal
