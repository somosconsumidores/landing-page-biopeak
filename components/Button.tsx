import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'white';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  fullWidth = false, 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-emerald text-navy hover:bg-emeraldDark hover:shadow-glow focus:ring-emerald shadow-lg shadow-emerald/20",
    secondary: "bg-surfaceHighlight text-white hover:bg-slate-700 hover:shadow-lg focus:ring-slate-500",
    outline: "bg-transparent border-2 border-emerald text-emerald hover:bg-emerald hover:text-navy focus:ring-emerald",
    white: "bg-white text-navy hover:bg-gray-100 shadow-sm focus:ring-white", // Mantido para casos específicos, mas menos usado no dark mode
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;