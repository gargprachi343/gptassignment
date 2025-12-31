import React from 'react';

/**
 * Reusable Input component
 * @param {Object} props - Component props
 */
const Input = ({
  label,
  error,
  required = false,
  className = '',
  ...props
}) => {
  const inputId = props.id || `input-${props.name || Math.random()}`;
  
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-primary-red ml-1">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={`
          w-full px-3 py-2 border rounded-md
          focus:outline-none focus:ring-2 focus:ring-secondary-orange
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${className}
        `}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-1 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;

