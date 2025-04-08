import React from 'react';
import clsx from 'clsx';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className={clsx(
        "container mx-auto p-4 lg:p-6",
        "grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6",
        "max-w-7xl transition-all duration-300",
        className
      )}>
        {children}
      </div>
    </div>
  );
};
