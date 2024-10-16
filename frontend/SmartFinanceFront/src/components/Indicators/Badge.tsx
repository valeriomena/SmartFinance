import React from 'react';
import './Badge.modules.css';

type BadgeProps = {
  variant: 'success' | 'warning' | 'danger';
  children: React.ReactNode;
};

export const Badge: React.FC<BadgeProps> = ({ variant, children }) => {
  return (
    <span className={`badge ${variant}`}>
      {children}
    </span>
  );
};
