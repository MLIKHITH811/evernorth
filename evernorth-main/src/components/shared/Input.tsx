import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ icon: Icon, label, error, className = '', ...props }) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={`w-full px-4 ${Icon ? 'pl-12' : ''} py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 ${
            error ? 'border-red-500' : ''
          } ${className}`}
          {...props}
        />
        {Icon && (
          <Icon className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
        )}
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input;