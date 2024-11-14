import React from 'react';
import { LucideIcon } from 'lucide-react';

interface TabButtonProps {
  active: boolean;
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ active, icon: Icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
        active
          ? 'bg-indigo-600 text-white'
          : 'text-gray-600 hover:bg-indigo-50'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );
};

export default TabButton;