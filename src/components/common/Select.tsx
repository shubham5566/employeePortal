import { FC, SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Array<{ value: string; label: string }>;
  error?: string;
  fullWidth?: boolean;
}

const Select: FC<SelectProps> = ({
  label,
  options,
  error,
  fullWidth = true,
  className = '',
  ...props
}) => {
  return (
    <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        className={`
          px-3 py-2 bg-white border shadow-sm border-gray-300 
          focus:outline-none focus:border-blue-500 focus:ring-1 
          focus:ring-blue-500 rounded-md text-sm
          ${fullWidth ? 'w-full' : ''}
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        {...props}
      >
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Select;