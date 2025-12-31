import React from 'react';
import { ROLES } from '../../utils/constants';

/**
 * Role badge component to display user role
 */
const RoleBadge = ({ role }) => {
  if (!role) return null;

  const isAdmin = role === ROLES.ADMIN;
  
  return (
    <span
      className={`
        px-3 py-1 text-sm font-medium rounded-full
        ${isAdmin
          ? 'bg-primary-red-light text-primary-red'
          : 'bg-secondary-orange-light text-secondary-orange-dark'
        }
      `}
      aria-label={`Current role: ${role}`}
    >
      {isAdmin ? 'Admin' : 'User'}
    </span>
  );
};

export default RoleBadge;

