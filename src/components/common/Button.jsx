import React from 'react';

/**
 * Reusable Button component
 * @param {Object} props - Component props
 * @param {string} props.variant - Button variant (primary, secondary, danger, outline)
 * @param {string} props.size - Button size (sm, md, lg)
 * @param {boolean} props.disabled - Disabled state
 * @param {React.ReactNode} props.children - Button content
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  children,
  ...props
}) => {
  const baseClasses = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-primary-red text-white hover:bg-primary-red-dark focus:ring-primary-red',
    secondary: 'bg-secondary-orange text-white hover:bg-secondary-orange-dark focus:ring-secondary-orange',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    outline: 'border-2 border-primary-red text-primary-red hover:bg-primary-red-light focus:ring-primary-red',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  return (
    <button
      className={classes}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

