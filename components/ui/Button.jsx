import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "px-6 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-fami-orange text-white hover:bg-orange-600 focus:ring-fami-orange",
    outline: "border-2 border-fami-blue text-fami-blue hover:bg-fami-blue hover:text-white focus:ring-fami-blue",
    ghost: "text-fami-blue hover:bg-fami-gray focus:ring-fami-blue",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
