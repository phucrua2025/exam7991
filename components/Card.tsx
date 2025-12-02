import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  onClick?: () => void;
  active?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', title, description, onClick, active }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-white rounded-2xl p-6 transition-all duration-300 border
        ${onClick ? 'cursor-pointer hover:-translate-y-1 hover:shadow-xl' : 'shadow-lg'}
        ${active ? 'border-teal-500 ring-2 ring-teal-500 ring-opacity-50' : 'border-slate-100'}
        ${className}
      `}
    >
      {(title || description) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-bold text-slate-800">{title}</h3>}
          {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;